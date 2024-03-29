import { sleep, fetchPosts } from './actions';
import {
  IParams,
  IPosts,
  IRedditData,
  IRedditDataChildren,
  IRedditMarketBot
} from '../types/types';
import * as googleTTS from 'google-tts-api';
import ChromecastAPI from 'chromecast-api';
import Device from 'chromecast-api/lib/device';

/**
 * The main class for the bot
 */
class RedditMarketBot implements IRedditMarketBot {
  params: IParams;
  latest: string;
  posts: IPosts[];

  constructor(params: IParams, latest: string = '', posts: IPosts[] = []) {
    this.params = params;
    this.latest = latest;
    this.posts = posts;
  }

  /**
   * Scans subreddit and alerts user via console/casting on new posts that match the search query
   *
   * @param query - The string to search for
   * @param callback - Callback function that is used to execute something after the bot is finished fetching and logging data
   */
  async listen(query: string, callback: (posts: IPosts[]) => void) {
    while (true) {
      try {
        const res: IRedditData = await fetchPosts(this.params.subreddit, this.params.postLimit);
        let data: IRedditDataChildren[] = res.data.children;

        if (this.latest) {
          const latestIndex = res.data.children.findIndex((post: IRedditDataChildren) => {
            return post.data.name === this.latest;
          });

          data = res.data.children.slice(0, latestIndex);
        }

        data.forEach((post: IRedditDataChildren) => {
          if (
            post.data.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
            post.data.title.toLowerCase().startsWith(`[${this.params.country.toLowerCase()}`)
          ) {
            this.posts.push({
              created: post.data.created,
              title: post.data.title,
              flair: post.data.link_flair_text,
              url: post.data.url,
              name: post.data.name
            });
          }
        });

        callback(this.posts);

        this.latest = res.data.children[0].data.name;
        this.posts = [];

        await sleep(this.params.pollRate);
      } catch (e: any) {
        console.log(e.msg);
        break;
      }
    }
  }

  /**
   * Gets the number of matches (if any), converts it into audio, then casts it into a Chromecast device
   * @remarks
   * Needs manual device selection
   */
  cast() {
    const postLength = this.posts.length;

    if (postLength > 0) {
      try {
        const msg: string =
          postLength.toString() +
          `${postLength === 1 ? ' match' : ' matches'} have been found on ${this.params.subreddit}`;

        const url: string = googleTTS.getAudioUrl(msg, {
          lang: 'en',
          slow: false,
          host: 'https://translate.google.com'
        });

        const client = new ChromecastAPI();

        client.on('device', (device: Device) => {
          device.play(url, (err) => {
            if (!err) {
              console.log('\x1b[2m%s\x1b[0m', `Playing notification on ${device.friendlyName} \n`);
            }
          });

          device.on('finished', () => {
            device.close();
          });
        });
      } catch (e: any) {
        console.log(e);
      }
    }
  }
}

export default RedditMarketBot;
