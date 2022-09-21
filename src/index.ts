import { SubmissionStream } from 'snoostorm';
import Snoowrap, { Submission } from 'snoowrap';
import * as dotenv from 'dotenv';
import googleHomeNotify from './googlehome';

/** Initialize dotenv */
dotenv.config();

/** Variables for filter */
/**   I do suggest putting in a country filter (US/EU/etc.) */
/**   country and keyword are both optional, use keyword when looking for a specific item (ex: 65) */
let sub: string = 'mechmarket';
let country: string = 'US';
let keyword: string = '';

/** Info display */
console.log('\n**********************************************');
console.log('Reddit Market Bot\nhttps://github.com/redoral/reddit-market-bot');
console.log('**********************************************');

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
  subreddit: sub,
  limit: 10,
  pollTime: 5000
});

/** Variables to keep track of posts per poll */
let matches = 0;
let postCount = 0;
let initialPoll = true;

/** Logs submission titles based on the given filter variables **/
submissions.on('item', (item: Submission) => {
  postCount++;

  const postTitle: string = item.title.toLowerCase();

  if (item.title.startsWith('[' + country) && postTitle.includes(keyword.toLowerCase())) {
    console.log('\x1b[32m', '\n[' + item.link_flair_text + '] ' + item.title);
    console.log('\x1b[36m%s\x1b[0m', item.url);
    matches++;
  }

  /** Google Home casting */
  if (keyword && initialPoll && postCount === 10) {
    if (matches > 0) {
      googleHomeNotify(matches, sub);
    }
    postCount = 0;
    matches = 0;
    initialPoll = false;
  } else if (keyword && !initialPoll) {
    if (matches > 0) {
      googleHomeNotify(1, sub);
      matches = 0;
    }
  }
});
