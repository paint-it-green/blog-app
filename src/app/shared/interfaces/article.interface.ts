export interface IArticle {
  title: string;
  description: string;
  picture: string;
}

export interface IArticleData extends IArticle {
  id: string;
  createdAt: string;
}
