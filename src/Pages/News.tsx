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
    <div>
      <Header
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
        onClick={fetchData}
      />
      <Sidebar />
      <h4>News</h4>
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

      <LatestNews />
    </div>
  );
}
