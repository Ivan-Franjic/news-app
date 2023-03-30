import "./News.scss";
import { useState, useEffect } from "react";
import Article from "../Components/Article/Article";
import LatestNews from "../Components/LatestNews/LatestNews";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

export default function News() {
  const { categoryName } = useParams()!;
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<string>("news");
  const [search, setSearch] = useState<string>("");

  const fetchData = () => {
    if (categoryName === undefined) {
      setUrl(
        `https://newsapi.org/v2/top-headlines?q=${search}&country=us&category=general&apiKey=ff6ab548f10341ddb1c486d6399fdbc2`
      );
      setCategory("news");
      setSearch("");
    } else {
      setUrl(
        `https://newsapi.org/v2/top-headlines?q=${search}&country=us&category=${categoryName}&apiKey=ff6ab548f10341ddb1c486d6399fdbc2`
      );
      setCategory(categoryName);
      setSearch("");
    }
  };
  useEffect(() => {
    fetchData();
  }, [categoryName]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>Request Failed</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="news">
      <div className="news__header">
        <Header
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
          onClick={fetchData}
        />
        <div className="header__buttons">
          <p>Featured</p>
          <p>Latest</p>
        </div>
        <div className="border"></div>
      </div>
      <div className="news__main">
        <div className="news__sidebar">
          <Sidebar />
        </div>
        <div className="news__content">
          <div className="news__articles">
            <p>News</p>
            <div className="articles">
              {data.articles.map((item: any) => {
                return (
                  <Article
                    title={item.title}
                    category={category}
                    author={item.author}
                    image={item.urlToImage}
                  />
                );
              })}
            </div>
          </div>
          <div className="news__latest">
            <LatestNews />
          </div>
        </div>
      </div>
    </div>
  );
}
