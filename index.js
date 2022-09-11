import { SubmissionStream } from 'snoostorm';
import Snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Snoowrap({
  userAgent: 'reddit-market-bot',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

const submissions = new SubmissionStream(client, {
  subreddit: 'mechmarket',
  limit: 10,
  pollTime: 2000
});

submissions.on('item', (item) => {
  if (item.title.includes('Paypal')) {
    console.log(item.title);
  }
});
