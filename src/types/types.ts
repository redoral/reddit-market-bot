/**
 * Interface for the actual submissions
 * @member data - Individual submission object
 * @member title - Title of the submission
 * @member link_flair_text - Flair of the submission
 * @member url - Complete URL of the submission
 * @member name - Unique ID of the submission
 */
interface PostChildrenI {
  data: {
    title: string;
    link_flair_text: string;
    url: string;
    name: string;
  };
}

/**
 * Interface for the JSON object we get as a response when fetching from the Reddit API
 * @member data - The top-most level 'data' key we get when we are starting from res.data when fetching
 * @member children - The actual array of submissions from the response
 */
interface PostI {
  data: {
    children: PostChildrenI[];
  };
}

/**
 * Interface for params object that we pass into the RedditMarketBot class
 * @member query - The string to search for in each title
 * @member subreddit - The subreddit you want this bot to scan
 * @member postLimit - The maximum amount of posts to fetch on each call
 */
interface ParamsI {
  query: string;
  subreddit: string;
  postLimit: number;
}

/**
 * Interface for the main RedditMarketBot class
 * @member params - Customizable parameters to match the search query
 * @member matches - The subreddit you want this bot to scan
 * @member loggedPosts - The maximum amount of posts to fetch on each call
 * @member listen - Class method that scans newest submissions that matches the search query
 * @member cast - Class method that casts an audio notification to a Chromecast device
 */
interface RedditMarketBotI {
  params: ParamsI;
  matches: number;
  loggedPosts: string[];
  listen: (callback: () => void) => void;
  cast: (numOfItems: number, sub: string) => void;
}

export { PostChildrenI, PostI, ParamsI, RedditMarketBotI };
