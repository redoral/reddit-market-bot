import { SubmissionStream } from 'snoostorm';
import Snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';

/** Variables for filter */
/**   'flair' is REQUIRED (Buying/Selling/Trading/etc.) */
/**   I do suggest putting in a country filter (US/EU/PH/etc.) */
/**   Keywords A and B are optional, leave keywords blank string to not use filter */
const country = 'US';
const flair = 'Selling';
const keywordA = '';
const keywordB = '';

/** Initialize dotenv */
dotenv.config();

/** Create snoowrap client using dotenv variables */
const client = new Snoowrap({
  userAgent: 'reddit-market-bot',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

/** Listens to new submissions every 30 seconds on r/mechmarket */
const submissions = new SubmissionStream(client, {
  subreddit: 'mechmarket',
  limit: 10,
  pollTime: 30000
});

/** Logs submission titles based on the given filter variables above **/
submissions.on('item', (item) => {
  if (
    (item.title.includes(keywordA) || item.title.includes(keywordB)) &&
    item.title.startsWith('[' + country) &&
    item.link_flair_text === flair
  ) {
    console.log('');
    console.log('[' + item.link_flair_text + '] ' + item.title);
  }
});
