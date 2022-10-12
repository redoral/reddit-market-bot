import { sleep, fetchPosts } from './actions';
import { PostI, PostChildrenI, ParamsI } from './types';

const params: ParamsI = {
  query: '',
  subreddit: 'mechmarket',
  postCount: 10
};

const app = async (isRunning: boolean, params: ParamsI) => {
  while (isRunning) {
    const data: PostI = await fetchPosts(params.subreddit, params.postCount);
    let matches = 0;

    data.data.children.forEach((post: PostChildrenI) => {
      if (post.data.title.indexOf(params.query) !== -1) {
        console.log(post.data.title);
        matches++;
      }
    });

    // TODO: Replace console.log() with castNotify()
    console.log(matches + ' matches have been found on this scan.');

    await sleep(30000);
  }
};

app(true, params);
