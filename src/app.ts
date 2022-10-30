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
  country: 'US',
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
 * Get the results using 'posts'
 * Enable cast notifications using .cast()
 */
bot.listen('switches', (posts: IPosts[]) => {
  posts.forEach((item) => {
    console.log(item.title);
  });

  bot.cast();
});
