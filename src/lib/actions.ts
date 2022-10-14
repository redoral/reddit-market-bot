import axios from 'axios';

/**
 * Prevents function from executing for a set amount of time
 *
 * @param ms - The amount of time you want the function to timeout
 * @returns A promise
 *
 * @beta
 */
const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetches the most recent posts from the specified reddit and post count using the given parameters
 *
 * @param subreddit - The subreddit you want this bot to scan
 * @param postLimit -  The maximum amount of posts to fetch on each call
 * @returns A JSON object or null on exception
 *
 * @beta
 */
const fetchPosts = async (subreddit: string, postLimit: number) => {
  try {
    const res = await axios.get(`https://reddit.com/r/${subreddit}/new/.json?limit=${postLimit}`);
    return Promise.resolve(res.data);
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export { sleep, fetchPosts };
