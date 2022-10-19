import { ParamsI } from './types/types';
import RedditMarketBot from './lib/redditmarketbot';

/**
 * Customizable parameters to match your search query
 * @see {@link ParamsI} for the data types and field descriptions
 *
 * @beta
 */
const params: ParamsI = {
  query: '',
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
 * Enable cast notifications using .cast()
 */
bot.listen(() => {});
