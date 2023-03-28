import "./Article.scss";
import { IArticle } from "../../Types/Article.type";
export default function Article({ title, category, author, image }: IArticle) {
  return (
    <div className="article">
      <img className="article__image" src={image} />
      <div className="article__details">
        <p className="article__category">{category}</p>
        <p className="article__title">{title}</p>
        <p className="article__author">{author}</p>
      </div>
    </div>
  );
}
