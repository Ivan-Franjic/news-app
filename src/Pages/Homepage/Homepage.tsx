import "./Homepage.scss";
import { useState, useEffect } from "react";
import Article from "../../Components/Article/Article";
import LatestNews from "../../Components/LatestNews/LatestNews";
import useSWR from "swr";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import image from "../../no-image.jpg";

export default function Homepage() {
  const [url, setUrl] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [ToggleState, setToggleState] = useState<number>(1);
  const [favourites, setFavourites] = useState(() => {
    const ls = localStorage.getItem("favourites");
    if (ls) return JSON.parse(ls);
    else return [];
  });

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveClass = (index: number, className: string) =>
    ToggleState === index ? className : "";

  const addFav = (title: string, author: string, image: string) => () => {
    const isFavourited = favourites.find(
      (favItem: any) => favItem.title === title
    );
    if (isFavourited)
      setFavourites((prev: any) => prev.filter((b: any) => b.title !== title));
    else setFavourites((prev: any) => [...prev, { title, author, image }]);
  };

  const fetchData = () => {
    setUrl(
      `https://newsapi.org/v2/top-headlines?q=${search}&country=us&apiKey=ff6ab548f10341ddb1c486d6399fdbc2`
    );
    setSearch("");
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div className="failed">Request Failed</div>;
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="homepage__header">
        <div className="header__banner">
          <div className="banner__text">
            <span>Make MyNews your homepage</span>
            <span>Every day discover what's trending on the internet!</span>
          </div>
          <div className="banner__buttons">
            <button className="button__get">Get</button>
            <button className="button__no">No, thanks</button>
          </div>
        </div>
        <div className="header__main">
          <Header
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }}
            onClick={fetchData}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                fetchData();
              }
            }}
            navbarOpen={navbarOpen}
          />
        </div>
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
        <ul className={`header__buttons${navbarOpen ? " show-menu" : ""}`}>
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
        <div className={`homepage__content${navbarOpen ? " show-menu" : ""}`}>
          <div className="content__articles">
            <p>News</p>
            <div className={`content ${getActiveClass(1, "active-content")}`}>
              <div className="articles">
                <div className="articles__top">
                  <div className="top__articles">
                    {data.articles.length > 0 ? (
                      data.articles
                        .slice(0, 4)
                        .map((item: any, index: number) => {
                          const isFavourited = favourites.find(
                            (favItem: any) => favItem.title === item.title
                          );
                          return item.urlToImage === null ? (
                            <Article
                              key={index}
                              title={item.title}
                              category="news"
                              author={item.author}
                              image={image}
                              favourite={
                                <span
                                  onClick={addFav(
                                    item.title,
                                    item.author,
                                    item.urlToImage
                                  )}
                                >
                                  {isFavourited ? (
                                    <BsStarFill
                                      style={{
                                        color: "#ffd250",
                                        cursor: "pointer",
                                      }}
                                    />
                                  ) : (
                                    <BsStar
                                      style={{
                                        color: "#ffd250",
                                        cursor: "pointer",
                                      }}
                                    />
                                  )}
                                </span>
                              }
                            />
                          ) : (
                            <Article
                              key={index}
                              title={item.title}
                              category="news"
                              author={item.author}
                              image={item.urlToImage}
                              favourite={
                                <span
                                  onClick={addFav(
                                    item.title,
                                    item.author,
                                    item.urlToImage
                                  )}
                                >
                                  {isFavourited ? (
                                    <BsStarFill
                                      style={{
                                        color: "#ffd250",
                                        cursor: "pointer",
                                      }}
                                    />
                                  ) : (
                                    <BsStar
                                      style={{
                                        color: "#ffd250",
                                        cursor: "pointer",
                                      }}
                                    />
                                  )}
                                </span>
                              }
                            />
                          );
                        })
                    ) : (
                      <div>No articles found!</div>
                    )}
                  </div>
                  <div
                    className={`content ${getActiveClass(2, "active-content")}`}
                  >
                    <LatestNews />
                  </div>
                </div>
                <div className="bottom__articles">
                  {data.articles.length > 4
                    ? data.articles.slice(4).map((item: any, index: number) => {
                        const isFavourited = favourites.find(
                          (favItem: any) => favItem.title === item.title
                        );
                        return item.urlToImage === null ? (
                          <Article
                            key={index}
                            title={item.title}
                            category="news"
                            author={item.author}
                            image={image}
                            favourite={
                              <span
                                onClick={addFav(
                                  item.title,
                                  item.author,
                                  item.urlToImage
                                )}
                              >
                                {isFavourited ? (
                                  <BsStarFill
                                    style={{
                                      color: "#ffd250",
                                      cursor: "pointer",
                                    }}
                                  />
                                ) : (
                                  <BsStar
                                    style={{
                                      color: "#ffd250",
                                      cursor: "pointer",
                                    }}
                                  />
                                )}
                              </span>
                            }
                          />
                        ) : (
                          <Article
                            key={index}
                            title={item.title}
                            category="news"
                            author={item.author}
                            image={item.urlToImage}
                            favourite={
                              <span
                                onClick={addFav(
                                  item.title,
                                  item.author,
                                  item.urlToImage
                                )}
                              >
                                {isFavourited ? (
                                  <BsStarFill
                                    style={{
                                      color: "#ffd250",
                                      cursor: "pointer",
                                    }}
                                  />
                                ) : (
                                  <BsStar
                                    style={{
                                      color: "#ffd250",
                                      cursor: "pointer",
                                    }}
                                  />
                                )}
                              </span>
                            }
                          />
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
            <div className={`content ${getActiveClass(2, "active-content")}`}>
              <div className="latest__news">
                <LatestNews />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
}
