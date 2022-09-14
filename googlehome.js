import ChromecastAPI from 'chromecast-api';
import * as googleTTS from 'google-tts-api';

const googleHomeNotify = (numOfItems, sub) => {
  const msg =
    numOfItems.toString() +
    `${numOfItems === 1 ? 'match' : 'matches'}` +
    ' have been found on ' +
    sub;

  const url = googleTTS.getAudioUrl(msg, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com'
  });

  const client = new ChromecastAPI();

  client.on('device', (device) => {
    device.play(url, (err) => {
      if (!err) console.log('\nPlaying notification on ' + device.friendlyName + '.');
    });

    device.on('finished', () => {
      device.close((err) => {
        if (!err) console.log('Disconnected from ' + device.friendlyName + '.');
      });
    });
  });
};

export default googleHomeNotify;
