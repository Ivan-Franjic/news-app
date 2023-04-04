import "./LatestNews.scss";
import useSWR from "swr";
export default function LatestNews() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `https://newsapi.org/v2/top-headlines?q=&country=us&apiKey=ff6ab548f10341ddb1c486d6399fdbc2`,
    fetcher
  );
  if (error) return <div>Request Failed</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="latest-news">
      <div className="latest-news__header">
        <span className="header__dot"></span>
        <span>Latest news</span>
      </div>
      <div className="latest-news__articles">
        {data.articles.map((item: any, index: number) => {
          return (
            <div key={index}>
              <p className="latest-news__time">
                {item.publishedAt.substr(11, 5)}
              </p>
              <p className="latest-news__title">{item.title}</p>
              <p className="article__border"></p>
            </div>
          );
        })}
      </div>
      <div className="latest-news__footer">
        <span>See all news</span>
        <p className="footer__arrow"></p>
      </div>
    </div>
  );
}
