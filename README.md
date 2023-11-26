# [DEPRECATED] Reddit Market Bot

**PROJECT IS NOW DEPRECATED DUE TO REDDIT'S API CHANGES**

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white) ![Chromecast](https://img.shields.io/badge/Chromecast-999999.svg?style=for-the-badge&logo=Chromecast&logoColor=white)

The Reddit Market Bot is a simple bot that listens to new posts on a specified market subreddit, logs the new posts that matches the search query to the console, and notifies via audio using a Chromecast device (ideally a Google Home speaker).

This was made for personal use when I was looking for new boards on [/r/mechmarket](https://reddit.com/r/mechmarket).

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
interface IParams {
  subreddit: string; // The subreddit you want this bot to scan
  country: string; // 2-digit country code that you are in
  postLimit: number; // The maximum amount of posts to fetch on each call
  pollRate: number; // Number of times the bot will scan the subreddit in ms
};
```

5. Run the app using `npm start` or `npm run start`

### Class Usage Example

```TypeScript
/**
 * Initialize new bot object
 */
const bot = new RedditMarketBot(params);

/**
 * Start the bot using .listen()
 * Replace 'switches' with the item you're searching for
 * Get the results using 'posts'
 * Enable cast notifications using .cast()
 */
bot.listen('switches', (posts: IPosts[]) => {
  posts.forEach((item) => {
    console.log(item.title);
  });

  bot.cast();
});
```

This block of code is already on `app.ts` but I am writing it in here anyway.

## Support

Now, this app was designed to be used on [/r/mechmarket](https://www.reddit.com/r/mechmarket) but you can theoretically use this on other market subreddits by changing `subreddit` in `params` as long as the submission titles follow the following format:

```
[US-NV] [H] Item that they have [W] Item that they want
```

With `[US-NV]` being 2-letter formats of `[COUNTRY-STATE]` or `[COUNTRY-PROVINCE]`.
