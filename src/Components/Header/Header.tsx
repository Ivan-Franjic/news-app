import "./Header.scss";

export default function Header({
  onClick,
  onChange,
}: {
  onClick: React.MouseEventHandler;
  onChange: React.ChangeEventHandler;
}) {
  return (
    <div className="header">
      <span className="header__title">
        <span className="header__title--red">My</span>News
      </span>
      <div className="header__search">
        <input type="search" placeholder="Search news" onChange={onChange} />
        <button onClick={onClick} className="header__button" type="submit">
          SEARCH
        </button>
      </div>
    </div>
  );
}
