import "./Header.scss";
import { IHeader } from "../../Types/Header.type";
import { Link } from "react-router-dom";

export default function Header({
  onClick,
  onChange,
  onKeyPress,
  navbarOpen,
}: IHeader) {
  return (
    <div className={`header${navbarOpen ? " show-menu" : ""}`}>
      <Link style={{ textDecoration: "none" }} to={`/`}>
        <span className="header__title">
          <span className="header__title--red">My</span>News
        </span>
      </Link>
      <div className="header__search" onKeyPress={onKeyPress}>
        <input type="search" placeholder="Search news" onChange={onChange} />
        <button onClick={onClick} className="header__button" type="submit">
          SEARCH
        </button>
      </div>
    </div>
  );
}
