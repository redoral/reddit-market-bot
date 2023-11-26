import axios from 'axios';
import { IRedditData } from '../types/types';

/**
 * Prevents function from executing for a set amount of time
 * @param ms - The amount of time you want the function to timeout
 * @returns A promise
 */
const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetches the most recent posts from the specified reddit and post count using the given parameters
 * @param subreddit - The subreddit you want this bot to scan
 * @param postLimit -  The maximum amount of posts to fetch on each call
 * @returns A JSON object - {@link IRedditData}
 *
 */
const fetchPosts = async (subreddit: string, postLimit: number) => {
  try {
    const res = await axios.get(`https://reddit.com/r/${subreddit}/new/.json?limit=${postLimit}`);
    return Promise.resolve(res.data as IRedditData);
  } catch (e: any) {
    return e.msg;
  }
};

export { sleep, fetchPosts };
