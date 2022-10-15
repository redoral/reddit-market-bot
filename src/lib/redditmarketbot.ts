import { sleep, fetchPosts } from './actions';
import { PostI, PostChildrenI, ParamsI, RedditMarketBotI } from '../types/types';
import * as googleTTS from 'google-tts-api';
import ChromecastAPI from 'chromecast-api';
import Device from 'chromecast-api/lib/device';

/**
 * The main class for the bot
 */
class RedditMarketBot implements RedditMarketBotI {
  params: ParamsI;
  matches: number;
  loggedPosts: string[];

  constructor(params: ParamsI, matches: number = 0, loggedPosts: string[] = []) {
    this.params = params;
    this.matches = matches;
    this.loggedPosts = loggedPosts;
  }

  /**
   * Scans subreddit and alerts user via console/casting on new posts that match the search query
   * @remarks
   * Needs optimization
   *
   * @param callback - Callback function that is used to execute something after the bot is finished fetching and logging data
   * @beta
   */
  async listen(callback: () => void) {
    while (true) {
      this.matches = 0;
      const data: PostI = await fetchPosts(this.params.subreddit, this.params.postLimit);

      data.data.children.forEach((post: PostChildrenI) => {
        if (
          post.data.title.indexOf(this.params.query) !== -1 &&
          !this.loggedPosts.includes(post.data.name)
        ) {
          console.log('\x1b[36m%s\x1b[0m', post.data.title);
          console.log('\x1b[32m%s\x1b[0m', post.data.url + '\n');

          this.matches++;
          this.loggedPosts.push(post.data.name);
        }
      });

      if (this.loggedPosts.length > this.params.postLimit) {
        this.loggedPosts = [];
      }

      callback();
      await sleep(30000);
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
        `${this.matches === 1 ? ' match' : ' matches'}` +
        ' have been found on ' +
        this.params.subreddit;

      const url: string = googleTTS.getAudioUrl(msg, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com'
      });

      const client = new ChromecastAPI();

      client.on('device', (device: Device) => {
        device.play(url, (err) => {
          if (!err) console.log('\nPlaying notification on ' + device.friendlyName + '.');
        });

        device.on('finished', () => {
          device.close();
        });
      });
    }
  }
}

export default RedditMarketBot;
