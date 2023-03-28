import "./News.scss";
import { useState, useEffect } from "react";
import Article from "../Components/Article/Article";
// import LatestNews from "../Components/LatestNews/LatestNews";
import useSWR from "swr";
import { useParams } from "react-router-dom";

export default function News() {
  const { categoryName } = useParams();
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (categoryName === undefined) {
      setUrl("general");
    } else {
      setUrl(categoryName);
    }
  }, [categoryName]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `https://newsapi.org/v2/top-headlines?country=us&category=${url}&apiKey=ff6ab548f10341ddb1c486d6399fdbc2`,
    fetcher
  );
  if (error) return <div>Request Failed</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h4>News</h4>
      {data.articles.map((item: any) => {
        return (
          <Article
            title={item.title}
            category={url}
            author={item.author}
            image={item.urlToImage}
          />
        );
      })}

      {/* <LatestNews /> */}
    </div>
  );
}
