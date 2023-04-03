import "./Article.scss";
import { IArticle } from "../../Types/Article.type";
export default function Article({
  title,
  category,
  author,
  image,
  favourite,
}: IArticle) {
  return (
    <div className="article">
      <img className="article__image" src={image} />
      <div className="article__details">
        <p className="article__category">{category}</p>
        <p className="article__title">
          {title} <span className="article__favourite">{favourite}</span>
        </p>
        <div className="article__footer">
          <p className="article__author">{author}</p>
          <span>{favourite}</span>
        </div>
      </div>
    </div>
  );
}
