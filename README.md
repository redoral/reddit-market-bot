# Reddit Market Bot

The Reddit Market Bot is a simple bot that listens to new posts on a specified subreddit and logs the new posts to the console.

This was made for personal use as I am currently looking for new boards on [/r/mechmarket](https://reddit.com/r/mechmarket).

## Usage

### Requirements

- NodeJS
- The money to buy stuff on r/mechmarket :(

### Installation

1. Clone the repository
2. Navigate to the folder
3. Run `npm install`

```Shell
git clone https://github.com/redoral/reddit-market-bot.git
cd reddit-market-bot
npm install
```

4. Create a .env file with the following parameters:

```javascript
CLIENT_ID=***
CLIENT_SECRET=***
REDDIT_USER=***
REDDIT_PASS=***
```

5. Fill in the necessary values, for instructions on how to get the values, see [example](https://towardsdatascience.com/how-to-use-the-reddit-api-in-python-5e05ddfd1e5c).
6. Update filter if needed in code, then run the app with `node index.js` and you should be good to go!

## Future Plans

If It turns out that I use this bot a lot, I might turn this into an API with ExpressJS and create a React Native frontend for it, but for now, console logging will do for my needs.
