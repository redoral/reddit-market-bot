# Reddit Market Bot

![Reddit](https://img.shields.io/badge/Reddit-%23FF4500.svg?style=for-the-badge&logo=Reddit&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

The Reddit Market Bot is a simple bot that listens to new posts on a specified subreddit and logs the new posts to the console.

This was made for personal use as I am currently looking for new boards on [/r/mechmarket](https://reddit.com/r/mechmarket).

Made with [nodeJS](https://nodejs.org/en/), [snoowrap](https://www.npmjs.com/package/snoowrap), and [snoostorm](https://www.npmjs.com/package/snoostorm).

**This is still a work in progress project, the code is currently unfinished.**

## Usage

### Requirements

- NodeJS
- Git

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
6. Update filter if needed in code, then run the app with `node index.js` and you should be good to go!

## Future Plans

- Google Assistant integration. I want my Google Home to say something when a match has been found for whatever item I am searching for.
- If It turns out that I use this bot a lot, I might turn this into an API with ExpressJS and create a React Native frontend for it, but for now, console logging will do for my needs.
