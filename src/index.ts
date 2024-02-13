import type { OnHomePageHandler } from '@metamask/snaps-sdk';
import {
  type OnTransactionHandler,
} from '@metamask/snaps-sdk';
import { heading, panel, text, divider } from '@metamask/snaps-ui';

import type {
  StampOutput,
} from './types';

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
// export const onRpcRequest: OnRpcRequestHandler = async ({
//   origin,
//   request,
// }) => {
//   const { method, params } = request;
//   switch (method) {
//     case 'hello':
//       return snap.request({
//         method: 'snap_dialog',
//         params: {
//           type: 'confirmation',
//           content: panel([
//             text(`Hello, **${origin}**!`),
//             text('This custom confirmation is just for display purposes.'),
//             text(
//               'But you can edit the snap source code to make it do something, if you want to!',
//             ),
//           ]),
//         },
//       });
//     case 'loadApiKey':
//       isValidLoadApiKeyRequest(params as LoadApiKeyParams);
//       await SnapStorage.save({
//         apiKey: (params as LoadApiKeyParams).apiKey,
//       });
//       return snap.request({
//         method: 'snap_dialog',
//         params: {
//           type: 'alert',
//           content: panel([
//             heading('API key loaded!'),
//             text('You can now use the snap .'),
//           ]),
//         },
//       });
//     default:
//       throw new Error('Method not found.');
//   }
// };

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

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  try {
    const response = await fetch(`https://gitcoin-metamask-snap-api.onrender.com/score?receiver=${transaction.to}`);
    const score_result: {
      stampsCount: number;
      stampsToPlatform: StampOutput;
      addressScore: number;
    } = await response.json();

    const { stampsCount, stampsToPlatform, addressScore } = score_result;

    // create a panel with a text for each connected service
    const stampsData = [];
    stampsData.push(heading('Receiver\'s Snaps Metadata'));
    for (const [platform, stampsGroup] of Object.entries(stampsToPlatform)) {
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

    return {
      content: panel([
        panel([
          heading('Transaction insights Snap'),
          text(`Gitcoin analytics for **${transaction.to}**`),
          text(`Address score: **${addressScore}**`),
          text(`Total number of stamps: **${stampsCount}**`),
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
