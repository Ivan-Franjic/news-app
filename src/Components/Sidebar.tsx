import "./Sidebar.scss";
import { HiHome } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { ImBriefcase } from "react-icons/im";
import { BiHealth } from "react-icons/bi";
import { MdOutlineScience } from "react-icons/md";
import { IoFootball } from "react-icons/io5";
import { FiMonitor } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link className="sidebar__link" to={`/`}>
        <div className="sidebar__item">
          <HiHome className="sidebar__icon" />
          <span className="sidebar__text">Home</span>
        </div>
      </Link>
      <Link className="sidebar__link" to={`/general`}>
        <div className="sidebar__item">
          <IoNewspaperOutline className="sidebar__icon" />
          <span className="sidebar__text">General</span>
        </div>
      </Link>
      <Link className="sidebar__link" to={`/business`}>
        <div className="sidebar__item">
          <ImBriefcase className="sidebar__icon" />
          <span className="sidebar__text">Business</span>
        </div>
      </Link>
      <Link className="sidebar__link" to={`/health`}>
        <div className="sidebar__item">
          <BiHealth className="sidebar__icon" />
          <span className="sidebar__text">Health</span>
        </div>
      </Link>
      <Link className="sidebar__link" to={`/science`}>
        <div className="sidebar__item">
          <MdOutlineScience className="sidebar__icon" />
          <span className="sidebar__text">Science</span>
        </div>
      </Link>
      <Link className="sidebar__link" to={`/sports`}>
        <div className="sidebar__item">
          <IoFootball className="sidebar__icon" />
          <span className="sidebar__text">Sports</span>
        </div>
      </Link>
      <Link className="sidebar__link" to={`/technology`}>
        <div className="sidebar__item">
          <FiMonitor className="sidebar__icon" />
          <span className="sidebar__text">Technology</span>
        </div>
      </Link>
      <Link className="sidebar__link" to={`/favourites`}>
        <div className="sidebar__item">
          <AiFillStar className="sidebar__icon" />
          <span className="sidebar__text">Favourites</span>
        </div>
      </Link>
    </div>
  );
}
