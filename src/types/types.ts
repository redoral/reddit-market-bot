/**
 * Interface for the actual submissions
 * @member data - Individual submission object
 * @member title - Title of the submission
 * @member link_flair_text - Flair of the submission
 * @member url - Complete URL of the submission
 * @member name - Unique ID of the submission
 * @member created - UNIX timestamp of when the post was created
 */
interface IRedditDataChildren {
  data: {
    title: string;
    link_flair_text: string;
    url: string;
    name: string;
    created: number;
  };
}

/**
 * Interface for the JSON object we get as a response when fetching from the Reddit API
 * @member data - The top-most level 'data' key we get when we are starting from res.data when fetching
 * @member children - The actual array of submissions from the response
 */
interface IRedditData {
  data: {
    children: IRedditDataChildren[];
  };
}

/**
 * Interface for params object that we pass into the RedditMarketBot class
 * @member query - The string to search for in each title
 * @member subreddit - The subreddit you want this bot to scan
 * @member postLimit - The maximum amount of posts to fetch on each call
 * @member pollRate - Number of times the bot will scan the subreddit in ms
 */
interface IParams {
  subreddit: string;
  postLimit: number;
  pollRate: number;
}

/**
 * Interface for the main RedditMarketBot class
 * @member params - Customizable parameters to match the search query
 * @member matches - The subreddit you want this bot to scan
 * @member latest - The newest post on the subreddit
 * @member listen - Class method that scans newest submissions that matches the search query
 * @member cast - Class method that casts an audio notification to a Chromecast device
 */
interface IRedditMarketBot {
  params: IParams;
  matches: number;
  latest: string;
  listen: (subreddit: string, callback: (posts: IPosts[]) => void) => void;
  cast: (numOfItems: number, sub: string) => void;
}

/**
 * Interface for the array that gets returned in the callback under .listen()
 * @member name - Unique ID of the submission
 * @member title - Title of the submission
 * @member url - Complete URL of the submission
 * @member flair - Flair of the submission
 * @member created - UNIX timestamp of when the post was created
 */
interface IPosts {
  name?: string;
  title?: string;
  url?: string;
  flair?: string;
  created?: number;
}

export { IParams, IPosts, IRedditData, IRedditDataChildren, IRedditMarketBot };
