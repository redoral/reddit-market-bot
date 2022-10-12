import axios from 'axios';
import ChromecastAPI from 'chromecast-api';
import Device from 'chromecast-api/lib/device';
import * as googleTTS from 'google-tts-api';

/** Function for sleep, prevents app from fetching data multiple times in a short amount of time */
const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/** Function to fetch posts from reddit using axios */
const fetchPosts = async (subreddit: string, postCount: number) => {
  try {
    const res = await axios.get(`https://reddit.com/r/${subreddit}/new/.json?limit=${postCount}`);
    return Promise.resolve(res.data);
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

/** Function that plays audio on Chromecast device */
const castNotify = async (numOfItems: number, sub: string) => {
  /** Text to play on Chromecast device */
  const msg: string =
    numOfItems.toString() +
    `${numOfItems === 1 ? 'match' : 'matches'}` +
    ' have been found on ' +
    sub;

  /** Convert text into speech and get URL for audio  */
  const url: string = googleTTS.getAudioUrl(msg, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com'
  });

  /** Initialize and start ChromecastAPI */
  const client = new ChromecastAPI();

  client.on('device', (device: Device) => {
    /** Play audio on device using the URL from TTS */
    device.play(url, (err) => {
      if (!err) console.log('\nPlaying notification on ' + device.friendlyName + '.');
    });

    /** Disconnect from Chromecast after audio plays */
    device.on('finished', () => {
      device.close();
    });
  });
};

export { sleep, fetchPosts, castNotify };
