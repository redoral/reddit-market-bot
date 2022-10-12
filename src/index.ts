import { sleep, fetchPosts } from './actions';
import { PostI, PostChildrenI } from './types';

const app = async (isRunning: Boolean, query: string) => {
  while (isRunning) {
    const data: PostI = await fetchPosts();
    let matches = 0;

    data.data.children.forEach((post: PostChildrenI) => {
      if (post.data.title.indexOf(query) >= 0) {
        console.log(post.data.title);
        matches++;
      }
    });

    // TODO: Replace console.log() with castNotify()
    console.log(matches + ' matches have been found on this scan.');

    await sleep(30000);
  }
};

app(true, '65');
