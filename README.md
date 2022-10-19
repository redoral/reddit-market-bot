# [WIP] Reddit Market Bot

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white) ![Chromecast](https://img.shields.io/badge/Chromecast-999999.svg?style=for-the-badge&logo=Chromecast&logoColor=white)

The Reddit Market Bot is a simple bot that listens to new posts on a specified market subreddit, logs the new posts that matches the search query to the console, and notifies via audio using a Chromecast device (ideally a Google Home speaker).

This was made for personal use when I was looking for new boards on [/r/mechmarket](https://reddit.com/r/mechmarket). Still working on this project despite finding a board!

Made with:

- [nodejs](https://nodejs.org/en/)
- [axios](https://github.com/axios/axios)
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

4. Update `params` on `index.ts` to your liking

```TypeScript
interface ParamsI {
  query: string; // The string to search for in each title
  subreddit: string; // The subreddit you want this bot to scan
  postLimit: number; // The maximum amount of posts to fetch on each call
  pollRate: number; // Number of times the bot will scan the subreddit in ms
};
```

5. Run the app using `npm start` or `npm run start`

### Class Usage

```TypeScript
// Create the bot object
const bot = new RedditMarketBot(params);

// Start the bot using .listen()
bot.listen(() => {
  // Callback function, do what you want here once fetching is done
  //  Use .cast() to cast audio notifications to a Chromecast device
  bot.cast()
})
```

This block of code is already on `app.ts` but I am writing it in here anyway as an example.

## Support

Now, this app was designed to be used on [/r/mechmarket](https://www.reddit.com/r/mechmarket) but you can theoretically use this on other market subreddits by changing `subreddit` in `params` as long as the submission titles follow the following format:

```
[US-NV] [H] Item that they have [W] Item that they want
```

With `[US-NV]` being 2-letter formats of `[COUNTRY-STATE]` or `[COUNTRY-PROVINCE]`.

## Future Plans

Everything you see listed here is just something that I eventually want to do but is unlikely to happen, but you never know! Anyway, I'm thinking of doing the following:

- Device selection for casting to Chromecast device.
- Support for other market subreddits.
- Convert project into an API using ExpressJS.
- Create a mobile frontend, with push notifications, using React Native.
