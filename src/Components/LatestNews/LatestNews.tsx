import "./LatestNews.scss";
import useSWRInfinite from "swr/infinite";
import fetcher from "../../Common/fetch";

const perPage = 20;

export default function LatestNews() {
  const handleScroll = (e: any) => {
    const bottom =
      Math.abs(
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
      ) < 1;
    if (bottom) {
      setSize(size + 1);
    }
  };

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=${perPage}&page=${
        index + 1
      }&apiKey=ff6ab548f10341ddb1c486d6399fdbc2`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateAll: false,
      revalidateFirstPage: false,
    }
  );
  if (error) return <div>Request Failed</div>;
  if (!data) return <div>Loading...</div>;

  const news = data ? [].concat(...data) : [];

  return (
    <div className="latest-news">
      <div className="latest-news__header">
        <span className="header__dot"></span>
        <span>Latest news</span>
      </div>
      <div className="latest-news__articles" onScroll={handleScroll}>
        {news.map((item: any) => {
          return item.articles.map((article: any, index: number) => {
            return (
              <div key={index}>
                <p className="latest-news__time">
                  {article.publishedAt.substr(11, 5)}
                </p>
                <p className="latest-news__title">{article.title}</p>
                <p className="article__border"></p>
              </div>
            );
          });
        })}
      </div>
      <div className="latest-news__footer">
        <span>See all news</span>
        <p className="footer__arrow"></p>
      </div>
    </div>
  );
}
