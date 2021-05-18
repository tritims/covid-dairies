import React from "react";
import "./Toolbar.css";
import Hamburger from "../Hamburger/Hamburger";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import RISHA from "./risha.png";
import IIT from "./iittp.png";
import { Divider } from "@material-ui/core";

function Toolbar(props) {
  return (
    <Headroom>
      <div className="toolbarM">
        <div className="toolbar_navigation">
          <div className="toggle_toolbar_button">
            <Hamburger click={props.SideToggle} />
          </div>
          <div className="toolbar_logo_align">
            <img className="toolbar_logo_image" src={IIT} alt="iittp_logo" />
            <Divider orientation="vertical" flexItem />
            <img className="toolbar_logo_image" src={RISHA} alt="risha_logo" />
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="toolbar_logo toolbar_navigation_items">
              COVID Diaries
            </div>
          </Link>
          <div className="spacer" />
          <div className="toolbar_navigation_items">
            <ul>
              <li>
                <Link to="/addExperience">Write </Link>
              </li>
              <li>
                <Link to="/stories">Read</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Headroom>
  );
}

export default Toolbar;
