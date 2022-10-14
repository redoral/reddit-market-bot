interface PostChildrenI {
  data: {
    title: string;
    link_flair_text: string;
    url: string;
  };
}

interface PostI {
  data: {
    children: PostChildrenI[];
  };
}

interface ParamsI {
  query: string;
  subreddit: string;
  postLimit: number;
}

interface RedditMarketBotI {
  params: ParamsI;
  matches: number;
  listen: (callback: () => void) => void;
  cast: (numOfItems: number, sub: string) => void;
}

export { PostChildrenI, PostI, ParamsI, RedditMarketBotI };
