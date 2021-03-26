import { IArticle, IArticleData } from "../interfaces";

export class Article implements IArticleData {

  id: number;
  createdAt: string;
  updatedDate: string;

  title: string;
  description: string;
  picture: string;

  deserialize(input: any): Article {
    Object.assign(this, input);
    return this;
  }

  get article(): IArticle {
    return {
      title: this.title,
      description: this.description,
      picture: this.picture,
    };
  }

  get articleData(): IArticleData {

    return {
      id: this.id,
      title: this.title,
      description: this.description,
      picture: this.picture,
      createdAt: this.createdAt,
    };
  }

}
