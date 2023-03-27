import "./Header.scss";
export default function Header() {
  return (
    <div className="header">
      <h1 className="header__title">News</h1>
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
