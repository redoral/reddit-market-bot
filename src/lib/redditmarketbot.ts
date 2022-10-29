import { sleep, fetchPosts } from './actions';
import { PostI, PostChildrenI, ParamsI, RedditMarketBotI, PostArrayI } from '../types/types';
import * as googleTTS from 'google-tts-api';
import ChromecastAPI from 'chromecast-api';
import Device from 'chromecast-api/lib/device';

/**
 * The main class for the bot
 */
class RedditMarketBot implements RedditMarketBotI {
  params: ParamsI;
  matches: number;
  latest: string;

  constructor(params: ParamsI, matches: number = 0, latest: string = '') {
    this.params = params;
    this.matches = matches;
    this.latest = latest;
  }

  /**
   * Scans subreddit and alerts user via console/casting on new posts that match the search query
   *
   * @param query - The string to search for
   * @param callback - Callback function that is used to execute something after the bot is finished fetching and logging data
   */
  async listen(query: string, callback: (post: PostArrayI[]) => void) {
    while (true) {
      try {
        const data: PostI = await fetchPosts(this.params.subreddit, this.params.postLimit);
        let sliced: PostChildrenI[] = data.data.children;
        let postArray: PostArrayI[] = [];

        if (this.latest) {
          const latestIndex = data.data.children.findIndex((post: PostChildrenI) => {
            return post.data.name === this.latest;
          });

          sliced = data.data.children.slice(0, latestIndex);
        }

        sliced.forEach((post: PostChildrenI) => {
          if (post.data.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            this.matches++;

            postArray.push({
              created: post.data.created,
              title: post.data.title,
              flair: post.data.link_flair_text,
              url: post.data.url,
              name: post.data.name
            });
          }
        });

        callback(postArray);

        this.matches = 0;
        this.latest = data.data.children[0].data.name;
        postArray = [];

        await sleep(this.params.pollRate);
      } catch (e: any) {
        console.log(e);
        break;
      }
    }
  }

  /**
   * Gets the number of matches (if any), converts it into audio, then casts it into a Chromecast device
   * @remarks
   * Needs manual device selection
   *
   * @beta
   */
  cast() {
    if (this.matches > 0) {
      const msg: string =
        this.matches.toString() +
        `${this.matches === 1 ? ' match' : ' matches'} have been found on ${this.params.subreddit}`;

      const url: string = googleTTS.getAudioUrl(msg, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com'
      });

      const client = new ChromecastAPI();

      client.on('device', (device: Device) => {
        device.play(url, (err) => {
          if (!err)
            console.log('\x1b[2m%s\x1b[0m', `Playing notification on ${device.friendlyName} \n`);
        });

        device.on('finished', () => {
          device.close();
        });
      });
    }
  }
}

export default RedditMarketBot;
