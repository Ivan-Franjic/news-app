import "./Header.scss";
export default function Header() {
  return (
    <div className="header">
      <span className="header__title">
        <span className="header__title--red">My</span>News
      </span>
      <form>
        <input
          className="header__search"
          type="search"
          placeholder="Search news"
        />
        <button className="header__button" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}
