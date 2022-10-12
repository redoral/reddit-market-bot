import { sleep, fetchPosts } from './actions';
import { PostI, PostChildrenI, ParamsI } from '../types/types';

class RedditMarketBot {
  params;

  constructor(params: ParamsI) {
    this.params = params;
  }

  async listen() {
    while (true) {
      const data: PostI = await fetchPosts(this.params.subreddit, this.params.postCount);
      let matches = 0;

      data.data.children.forEach((post: PostChildrenI) => {
        if (post.data.title.indexOf(this.params.query) !== -1) {
          console.log(post.data.title);
          matches++;
        }
      });

      // TODO: Replace console.log() with castNotify()
      console.log('\n' + matches + ' matches have been found on this scan.');

      await sleep(30000);
    }
  }
}

export default RedditMarketBot;
