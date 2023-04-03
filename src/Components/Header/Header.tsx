import "./Header.scss";

export default function Header({
  onClick,
  onChange,
  onKeyPress,
}: {
  onClick: React.MouseEventHandler;
  onChange: React.ChangeEventHandler;
  onKeyPress: React.KeyboardEventHandler;
}) {
  return (
    <div className="header">
      <span className="header__title">
        <span className="header__title--red">My</span>News
      </span>
      <div className="header__search" onKeyPress={onKeyPress}>
        <input type="search" placeholder="Search news" onChange={onChange} />
        <button onClick={onClick} className="header__button" type="submit">
          SEARCH
        </button>
      </div>
    </div>
  );
}
