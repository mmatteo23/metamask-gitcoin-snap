import type { OnHomePageHandler } from '@metamask/snaps-sdk';
import {
  type OnTransactionHandler,
} from '@metamask/snaps-sdk';
import { heading, panel, text, divider } from '@metamask/snaps-ui';

import type {
  StampOutput,
} from './types';

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: panel([
      heading('gm mate!'),
      text('Welcome to the Gitcoin Analytics Snap!'),
      text(
        'Enabling **KYR (Know Your Receiver) transactions**. Get stats on who you\'re sending money to directly on Metamask.',
      ),
      divider(),
      text('If you have any issues, pls contact [https://github.com/mmatteo23](https://github.com/mmatteo23).'),
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
