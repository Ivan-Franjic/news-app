import "./Banner.scss";

export default function Banner() {
  return (
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
  );
}
