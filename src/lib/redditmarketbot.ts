import { sleep, fetchPosts, castNotify } from './actions';
import { PostI, PostChildrenI, ParamsI, RedditMarketBotI } from '../types/types';

class RedditMarketBot implements RedditMarketBotI {
  params;

  constructor(params: ParamsI) {
    this.params = params;
  }

  async listen() {
    while (true) {
      let matches = 0;
      const data: PostI = await fetchPosts(this.params.subreddit, this.params.postCount);

      data.data.children.forEach((post: PostChildrenI) => {
        if (post.data.title.indexOf(this.params.query) !== -1) {
          console.log('\x1b[36m%s\x1b[0m', post.data.title);
          console.log('\x1b[32m%s\x1b[0m', post.data.url + '\n');
          matches++;
        }
      });

      if (this.params.enableCasting && matches > 0) {
        await castNotify(matches, this.params.subreddit);
      }

      await sleep(30000);
    }
  }
}

export default RedditMarketBot;
