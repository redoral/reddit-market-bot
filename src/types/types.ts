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
  postCount: number;
  enableCasting: boolean;
}

export { PostChildrenI, PostI, ParamsI };
