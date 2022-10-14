import { ParamsI } from './types/types';
import RedditMarketBot from './lib/redditmarketbot';

/**
 * Customizable parameters to match your search query
 *
 * @remarks
 * For the data types of each of these parameters, refer to ParamsI
 *
 * @param query - The string to search for in each title
 * @param subreddit - The subreddit you want this bot to scan
 * @param postLimit - The maximum amount of posts to fetch on each call
 *
 * @beta
 */
const params: ParamsI = {
  query: '',
  subreddit: 'mechmarket',
  postLimit: 10
};

// Create a new bot object and pass the params object
const bot = new RedditMarketBot(params);

// Start the bot using .listen()
bot.listen(() => {
  bot.cast();
});
