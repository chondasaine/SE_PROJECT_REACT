import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Terrance Tegegne" />
      <p className="sidebar__username">Terrance Tegegne</p>
    </div>
  );
}

export default SideBar;
