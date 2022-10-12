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

export { PostChildrenI, PostI };
