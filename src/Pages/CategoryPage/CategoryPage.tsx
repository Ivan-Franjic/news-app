import "./CategoryPage.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Article from "../../Components/Article/Article";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Banner from "../../Components/Banner/Banner";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import image from "../../no-image.jpg";

export default function CategoryPage() {
  const location = useLocation();
  const { categoryName } = useParams<string>();
  const [url, setUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("news");
  const [search, setSearch] = useState<string>("");
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [favourites, setFavourites] = useState(() => {
    const ls = localStorage.getItem("favourites");
    if (ls) return JSON.parse(ls);
    else return [];
  });
  const [filteredList, setFilteredList] = useState(favourites);

  const addFav = (title: string, author: string, image: string) => () => {
    const isFavourited = favourites.find(
      (favItem: any) => favItem.title === title
    );
    if (isFavourited)
      setFavourites((prev: any) => prev.filter((b: any) => b.title !== title));
    else setFavourites((prev: any) => [...prev, { title, author, image }]);
  };

  const filterFavouritesBySearch = () => {
    const query = search;
    let updatedList = [...favourites];
    updatedList = updatedList.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.author.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
    setSearch("");
  };

  const fetchData = () => {
    setUrl(
      `https://newsapi.org/v2/top-headlines?q=${search}&country=us&category=${categoryName}&apiKey=ff6ab548f10341ddb1c486d6399fdbc2`
    );
    setCategory(categoryName!);
    setSearch("");

    filterFavouritesBySearch();
  };

  useEffect(() => {
    fetchData();
    setNavbarOpen(false);
  }, [categoryName, location]);

  useEffect(() => {
    filterFavouritesBySearch();
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div className="failed">Request Failed</div>;
  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="categorypage__header">
        <Banner />
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
        <div className="header__border"></div>
      </div>
      <div className="categorypage__main">
        <div
          className={`categorypage__sidebar${navbarOpen ? " show-menu" : ""}`}
        >
          <Sidebar />
        </div>
        <div
          className={`categorypage__content${navbarOpen ? " show-menu" : ""}`}
        >
          <div className="content__articles">
            <p>News</p>
            <div className="categorypage__articles">
              {categoryName === "favourites" ? (
                favourites.length > 0 ? (
                  filteredList.map((item: any, index: number) => {
                    return item.image === null ? (
                      <Article
                        key={index}
                        title={item.title}
                        category={category}
                        author={item.author}
                        image={image}
                        favourite={
                          <span
                            onClick={addFav(
                              item.title,
                              item.author,
                              item.image
                            )}
                          >
                            {favourites.find(
                              (favItem: any) => favItem.title === item.title
                            ) ? (
                              <BsStarFill
                                style={{ color: "#ffd250", cursor: "pointer" }}
                              />
                            ) : (
                              <BsStar
                                style={{ color: "#ffd250", cursor: "pointer" }}
                              />
                            )}
                          </span>
                        }
                      />
                    ) : (
                      <Article
                        key={index}
                        title={item.title}
                        category={category}
                        author={item.author}
                        image={item.image}
                        favourite={
                          <span
                            onClick={addFav(
                              item.title,
                              item.author,
                              item.image
                            )}
                          >
                            {favourites.find(
                              (favItem: any) => favItem.title === item.title
                            ) ? (
                              <BsStarFill
                                style={{ color: "#ffd250", cursor: "pointer" }}
                              />
                            ) : (
                              <BsStar
                                style={{ color: "#ffd250", cursor: "pointer" }}
                              />
                            )}
                          </span>
                        }
                      />
                    );
                  })
                ) : (
                  <div>No favourite articles found!</div>
                )
              ) : data.articles.length > 0 ? (
                data.articles.map((item: any, index: number) => {
                  const isFavourited = favourites.find(
                    (favItem: any) => favItem.title === item.title
                  );
                  return item.urlToImage === null ? (
                    <Article
                      key={index}
                      title={item.title}
                      category={category}
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
                              style={{ color: "#ffd250", cursor: "pointer" }}
                            />
                          ) : (
                            <BsStar
                              style={{ color: "#ffd250", cursor: "pointer" }}
                            />
                          )}
                        </span>
                      }
                    />
                  ) : (
                    <Article
                      key={index}
                      title={item.title}
                      category={category}
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
                              style={{ color: "#ffd250", cursor: "pointer" }}
                            />
                          ) : (
                            <BsStar
                              style={{ color: "#ffd250", cursor: "pointer" }}
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
          </div>
        </div>
      </div>
    </div>
  );
}
{
}
