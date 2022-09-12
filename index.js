import { SubmissionStream } from 'snoostorm';
import Snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';

/** Variables for filter */
/**   I do suggest putting in a country filter (US/EU/etc.) */
/**   Both Keywords are optional, use when looking for a specific item (ex: 65) */
const country = 'US';
const keyword = 'qk65';
const keywordOpt = 'zoom65';

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
console.log('Country: ' + country);
console.log('Keyword: ' + (keyword ? keyword : 'N/A'));
console.log('Keyword Optional: ' + (keywordOpt ? keywordOpt : 'N/A'));
console.log('***************************');

/** Listens to new submissions every 30 seconds on r/mechmarket */
const submissions = new SubmissionStream(client, {
  subreddit: 'mechmarket',
  limit: 10,
  pollTime: 30000
});

/** Logs submission titles based on the given filter variables **/
submissions.on('item', (item) => {
  const postTitle = item.title.toLowerCase();

  if (item.title.startsWith('[' + country)) {
    if (postTitle.includes(keyword.toLowerCase())) {
      console.log('\x1b[32m', '\n[' + item.link_flair_text + '] ' + item.title);
      console.log('\x1b[36m%s\x1b[0m', item.url);
      console.log('*MATCH: ' + keyword + '*');
    } else if (postTitle.includes(keywordOpt.toLowerCase())) {
      console.log('\x1b[32m', '\n[' + item.link_flair_text + '] ' + item.title);
      console.log('\x1b[36m%s\x1b[0m', item.url);
      console.log('*MATCH: ' + keyword + '*');
    }
  }
});
