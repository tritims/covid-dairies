import { Link } from "react-router-dom";
import React from "react";
import "./SideDrawer.css";

function SideDrawer(props) {
  let side = "side-drawer";
  if (props.show) side = "side-drawer open";

  return (
    <nav className={side}>
      <Link
        onClick={() => props.click(false)}
        to="/"
        style={{ textDecoration: "none" }}
      >
        <div className="toolbar_logo">COVID Diaries</div>
      </Link>
      <div className="sidebar_navigation_items">
        <ul>
          <li>
            <Link onClick={() => props.click(false)} to="/addExperience">
              Write
            </Link>
          </li>
          <li>
            <Link onClick={() => props.click(false)} to="/stories">
              Read
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideDrawer;
