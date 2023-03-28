import "./Sidebar.scss";
import { HiHome } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { ImBriefcase } from "react-icons/im";
import { BiHealth } from "react-icons/bi";
import { MdOutlineScience } from "react-icons/md";
import { IoFootball } from "react-icons/io5";
import { FiMonitor } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/home`}
      >
        <HiHome className="sidebar__icon" />
        <span className="sidebar__text">Home</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/entertainment`}
      >
        <IoNewspaperOutline className="sidebar__icon" />
        <span className="sidebar__text">Entertainment</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/business`}
      >
        <ImBriefcase className="sidebar__icon" />
        <span className="sidebar__text">Business</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/health`}
      >
        <BiHealth className="sidebar__icon" />
        <span className="sidebar__text">Health</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/science`}
      >
        <MdOutlineScience className="sidebar__icon" />
        <span className="sidebar__text">Science</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/sports`}
      >
        <IoFootball className="sidebar__icon" />
        <span className="sidebar__text">Sports</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/technology`}
      >
        <FiMonitor className="sidebar__icon" />
        <span className="sidebar__text">Technology</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to={`/favourites`}
      >
        <AiFillStar className="sidebar__icon" />
        <span className="sidebar__text">Favourites</span>
      </NavLink>
    </div>
  );
}
