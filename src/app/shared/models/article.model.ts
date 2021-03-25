import { IArticle } from "../interfaces/article";

export class Article implements IArticle {

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

}
