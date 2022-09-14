import { SubmissionStream } from 'snoostorm';
import Snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';
import googleHomeNotify from './googlehome.js';

/** Variables for filter */
/**   I do suggest putting in a country filter (US/EU/etc.) */
/**   country and keyword are both optional, use keyword when looking for a specific item (ex: 65) */
const sub = 'mechmarket';
const country = '';
const keyword = 'paypal';

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

/** Info display */
console.log('\n***************************');
console.log('Reddit Market Bot by Red');
console.log('***************************');
console.log('Country: ' + (country ? country : 'N/A'));
console.log('Keyword: ' + (keyword ? keyword : 'N/A'));
console.log('***************************');

/** Listens to new submissions every 30 seconds on r/mechmarket */
const submissions = new SubmissionStream(client, {
  subreddit: sub,
  limit: 10,
  pollTime: 5000
});

/** Variables to keep track of posts per poll */
var matches = [];
var postCount = 0;
var initialPoll = true;

/** Logs submission titles based on the given filter variables **/
submissions.on('item', (item) => {
  postCount++;
  const postTitle = item.title.toLowerCase();

  if (item.title.startsWith('[' + country) && postTitle.includes(keyword.toLowerCase())) {
    console.log('\x1b[32m', '\n[' + item.link_flair_text + '] ' + item.title);
    console.log('\x1b[36m%s\x1b[0m', item.url);
    matches.push(postTitle);
  }

  /** Google Home casting */
  if (keyword && postCount === 10 && initialPoll == true) {
    if (matches.length > 0) {
      googleHomeNotify(matches.length.toString(), sub);
    }
    postCount = 0;
    matches = [];
    initialPoll = false;
  } else if (keyword && initialPoll == false) {
    if (matches.length > 0) {
      googleHomeNotify(1, sub);
      matches = [];
    }
  }
});
