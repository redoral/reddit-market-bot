import { IParams, IPosts } from './types/types';
import RedditMarketBot from './lib/redditmarketbot';

/**
 * Customizable parameters to match your search query
 * @see {@link IParams} for the data types and field descriptions
 *
 * @beta
 */
const params: IParams = {
  subreddit: 'mechmarket',
  postLimit: 10,
  pollRate: 15000
};

/**
 * Initialize new bot object
 */
const bot = new RedditMarketBot(params);

/**
 * Start the bot using .listen()
 * Replace 'switches' with the item you're searching for
 * Enable cast notifications using .cast()
 *
 * @param posts - returns an array of posts based on the post limit
 */
bot.listen('switches', (posts: IPosts[]) => {
  posts.forEach((item) => {
    console.log(item.title);
  });

  bot.cast();
});
