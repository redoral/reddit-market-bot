import { SubmissionStream } from 'snoostorm';
import Snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';

/** Variables for filter */
/**   ALL MUST BE LOWERCASE */
/**   'flair' is REQUIRED (Buying/Selling/Trading/etc.) */
/**   I do suggest putting in a country filter (us/eu/ph/etc.) */
/**   Keyword is optional, use when looking for a specific item (ex: 65) */
const country = 'us';
const flair = 'selling';
const keyword = '65';

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
console.log('Flair: ' + flair);
console.log('Keyword: ' + 65);

/** Listens to new submissions every 30 seconds on r/mechmarket */
const submissions = new SubmissionStream(client, {
  subreddit: 'mechmarket',
  limit: 10,
  pollTime: 30000
});

/** Logs submission titles based on the given filter variables **/
submissions.on('item', (item) => {
  const postTitle = item.title.toLowerCase();
  const postFlair = item.link_flair_text.toLowerCase();

  if (postFlair === flair && postTitle.startsWith('[' + country)) {
    /** If keyword is not empty and the app finds the word on the post title,
     *   text will turn to green and the link to cyan*/
    if (postTitle.includes(keyword) && keyword) {
      console.log('\x1b[32m', '\n[' + item.link_flair_text + '] ' + item.title);
      console.log('\x1b[36m%s\x1b[0m', item.url);
    } else {
      console.log('\n[' + item.link_flair_text + '] ' + item.title);
      console.log(item.url);
    }
  }
});
