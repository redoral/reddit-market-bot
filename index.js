import { SubmissionStream } from 'snoostorm';
import Snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';

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

/** Logs submission titles that have 65 or 75 in the title to the console */
/**   65 or 75 specifically for keyboards with the respective layouts */
submissions.on('item', (item) => {
  if (item.title.includes('65') || item.title.includes('75')) {
    console.log('[' + item.link_flair_text + '] ' + item.title);
  }
});
