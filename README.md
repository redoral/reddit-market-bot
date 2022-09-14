# [WIP] Reddit Market Bot w/ Chromecast

![Reddit](https://img.shields.io/badge/Reddit-%23FF4500.svg?style=for-the-badge&logo=Reddit&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Google Assistant](https://img.shields.io/badge/google%20assistant-4285F4?style=for-the-badge&logo=google%20assistant&logoColor=white)

The Reddit Market Bot is a simple bot that listens to new posts on a specified market subreddit, logs the new posts that matches the search query to the console, and notifies via audio using a Chromecast device (ideally a Google Home speaker).

This was made for personal use when I was looking for new boards on [/r/mechmarket](https://reddit.com/r/mechmarket). Still working on this project despite finding a board (zoom65)!

Made with:

- [nodejs](https://nodejs.org/en/)
- [snoowrap](https://github.com/not-an-aardvark/snoowrap)
- [snoostorm](https://github.com/MayorMonty/Snoostorm)
- [chromecast-api](https://github.com/alxhotel/chromecast-api)
- [google-tts-api](https://github.com/zlargon/google-tts)

## Usage

### Installation

1. Clone the repository
2. Navigate to the folder
3. Run `npm install`

```sh
git clone https://github.com/redoral/reddit-market-bot.git
cd reddit-market-bot
npm install
```

4. Create a .env file with the following parameters:

```js
CLIENT_ID=***
CLIENT_SECRET=***
REDDIT_USER=***
REDDIT_PASS=***
```

5. Fill in the necessary values. For instructions on how to get the values, see [example](https://towardsdatascience.com/how-to-use-the-reddit-api-in-python-5e05ddfd1e5c).
6. Update filter using `sub`, `country`, and `keyword` if needed in `index.js`, then run the app with `node index.js` and you should be good to go!

## Support

Now, this app was designed to be used on [/r/mechmarket](https://www.reddit.com/r/mechmarket) but you can theoretically use this on other market subreddits by changing the `sub` in the code as long as the submission titles follow the following format:

```
[US-NV] [W] Item that they want [H] Item that they have
```

With `[US-NV]` being 2-letter formats of `[COUNTRY-STATE]` or `[COUNTRY-PROVINCE]`.

## Future Plans

Everything you see listed here is just something that I eventually want to do but is unlikely to happen, but you never know! Anyway, I'm thinking of doing the following:

- Device selection for casting to Chromecast device.
- Support for other market subreddits.
- Convert project into an API using ExpressJS.
- Create a mobile frontend, with push notifications, using React Native.
