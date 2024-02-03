import type { OnHomePageHandler, OnInstallHandler } from '@metamask/snaps-sdk';
import {
  type OnRpcRequestHandler,
  type OnTransactionHandler,
} from '@metamask/snaps-sdk';
import { heading, panel, text, divider } from '@metamask/snaps-ui';

import SnapStorage from './SnapStorage';
import type {
  GitcoinStampItem,
  LoadApiKeyParams,
  StampMetadata,
  StampOutput,
} from './types';
import { isValidLoadApiKeyRequest } from './utils';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  const { method, params } = request;
  switch (method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    case 'loadApiKey':
      isValidLoadApiKeyRequest(params as LoadApiKeyParams);
      await SnapStorage.save({
        apiKey: (params as LoadApiKeyParams).apiKey,
      });
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            heading('API key loaded!'),
            text('You can now use the snap .'),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: panel([
      heading('gm mate!'),
      text(
        'Get insights about your transactions and be sure that you are sending funds to a human.',
      ),
      text('If you have any issues, pls contact https://github.com/mmatteo23.'),
    ]),
  };
};

export const onInstall: OnInstallHandler = async () => {
  console.log('EXECUTING onInstall');
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Thank you for installing Gitcoin Analytics Snap!'),
        text(
          "You're almost there! Now you have to load your API key to allow the snap calling the Gitcoin API.",
        ),
      ]),
    },
  });
};

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  console.log('transaction', transaction);
  try {
    const snapState = (await SnapStorage.load()) as
      | LoadApiKeyParams
      | undefined;
    console.log('snapState', snapState);
    if (!snapState || snapState.apiKey === undefined) {
      throw new Error(
        'You need to load the API key first. Please go to the snap site and load the API key.',
      );
    }
    const GITCOIN_BASE_URL = 'https://api.scorer.gitcoin.co/registry';
    const GITCOIN_API_KEY = snapState.apiKey;

    console.log('GITCOIN_BASE_URL', GITCOIN_BASE_URL);
    console.log('GITCOIN_API_KEY', GITCOIN_API_KEY);

    if (!GITCOIN_BASE_URL || !GITCOIN_API_KEY) {
      throw new Error('Missing .env variables');
    }

    const response = await fetch(
      `${GITCOIN_BASE_URL}/stamps/${transaction.to}?limit=1000&include_metadata=true`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': GITCOIN_API_KEY,
        },
      },
    );

    const stamps = await response.json();
    // console.log('stamps', JSON.stringify(stamps));

    // items from the response
    const { items } = stamps;

    // extract metadata from each item and create an array to show in the UI
    const metadata: StampMetadata[] = items.map(
      (item: GitcoinStampItem) => item.metadata,
    );

    // create a dynamic object to count the number of stamps for each platform
    const connectedServices: StampOutput = {};
    for (const item of metadata) {
      if (item) {
        if (!connectedServices[item.platform.id]) {
          connectedServices[item.platform.id] = {
            [item.group]: {
              stamps: [item.description],
            },
          };
        } else if (connectedServices[item.platform.id][item.group]) {
          connectedServices[item.platform.id][item.group]?.stamps.push(
            item.description,
          );
        } else {
          connectedServices[item.platform.id][item.group] = {
            stamps: [item.description],
          };
        }
      }
    }

    console.log('connectedServices', JSON.stringify(connectedServices));

    // create a panel with a text for each connected service
    const stampsData = [];
    stampsData.push(heading('Receiver Snap Details'));
    for (const [platform, stampsGroup] of Object.entries(connectedServices)) {
      stampsData.push(text(`**Platform**: ${platform}`));
      for (const [group, stampsArray] of Object.entries(stampsGroup)) {
        stampsData.push(text(`**Group**: ${group}`));
        stampsData.push(text(`**Stamps detail:**`));
        for (const stamp of stampsArray.stamps) {
          if (stamp !== 'Encrypted' && stamp !== platform) {
            stampsData.push(text(`  ${stamp}`));
          } else {
            stampsData.push(text(`Stamp description not available`));
          }
        }
      }
      stampsData.push(divider());
    }
    console.log('stampsData', JSON.stringify(stampsData));

    return {
      content: panel([
        panel([
          heading('Transaction insights Snap'),
          text(`Gitcoin analytics for **${transaction.to}**`),
          text(`Number of stamps: ${metadata.length}`),
        ]),
        divider(),
        panel(stampsData),
      ]),
    };
  } catch (error) {
    console.error('Error loading snap state', error);
    return {
      content: panel([
        panel([
          heading('Error in Transaction insights Snap'),
          text(`Gitcoin analytics for **${transaction.to}**`),
        ]),
        divider(),
        panel([
          text(`Seems like an error occurred:`),
          text((error as any).message),
        ]),
      ]),
    };
  }
};
