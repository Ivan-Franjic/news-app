import "./News.scss";
import { useState, useEffect } from "react";
import Article from "../Components/Article/Article";
import LatestNews from "../Components/LatestNews/LatestNews";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

export default function News() {
  const { categoryName } = useParams()!;
  const [url, setUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("news");
  const [search, setSearch] = useState<string>("");
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [ToggleState, setToggleState] = useState<number>(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveClass = (index: number, className: string) =>
    ToggleState === index ? className : "";

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
    <div className="homepage">
      <div className="homepage__header">
        <Header
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
          onClick={fetchData}
        />
        <button
          className="sidebar__toggler"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          {navbarOpen ? (
            <MdClose style={{ width: "32px", height: "32px" }} />
          ) : (
            <FiMenu
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          )}
        </button>
        <ul className="header__buttons">
          <li
            className={`tab ${getActiveClass(1, "active-tab")}`}
            onClick={() => toggleTab(1)}
          >
            Featured
          </li>
          <li
            className={`tab ${getActiveClass(2, "active-tab")}`}
            onClick={() => toggleTab(2)}
          >
            Latest
          </li>
        </ul>
        <div className="header__border"></div>
      </div>
      <div className="homepage__main">
        <div className={`homepage__sidebar${navbarOpen ? " show-menu" : ""}`}>
          <Sidebar />
        </div>
        <div className="homepage__content">
          <div className="content__articles">
            <p>News</p>
            <div className={`content ${getActiveClass(1, "active-content")}`}>
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
          </div>
          <div className={`content ${getActiveClass(2, "active-content")}`}>
            <div className="content__latest">
              <LatestNews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
}
