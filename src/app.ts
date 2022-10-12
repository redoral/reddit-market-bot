import { ParamsI } from './types/types';
import RedditMarketBot from './lib/redditmarketbot';

const params: ParamsI = {
  query: '',
  subreddit: 'mechmarket',
  postCount: 10,
  enableCasting: false
};

const bot = new RedditMarketBot(params);

bot.listen();
