import ChromecastAPI from 'chromecast-api';
import * as googleTTS from 'google-tts-api';

/** Function that plays audio on Chromecast device */
const googleHomeNotify = (numOfItems, sub) => {
  /** Text to play on Chromecast device */
  const msg =
    numOfItems.toString() +
    `${numOfItems === 1 ? 'match' : 'matches'}` +
    ' have been found on ' +
    sub;

  /** Convert text into speech and get URL for audio  */
  const url = googleTTS.getAudioUrl(msg, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com'
  });

  /** Initialize and start ChromecastAPI */
  const client = new ChromecastAPI();

  client.on('device', (device) => {
    /** Play audio on device using the URL from TTS */
    device.play(url, (err) => {
      if (!err) console.log('\nPlaying notification on ' + device.friendlyName + '.');
    });

    /** Disconnect from Chromecast after audio plays */
    device.on('finished', () => {
      device.close((err) => {
        if (!err) console.log('Disconnected from ' + device.friendlyName + '.');
      });
    });
  });
};

export default googleHomeNotify;
