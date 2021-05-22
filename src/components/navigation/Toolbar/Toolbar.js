import React from "react";
import "./Toolbar.css";
import Hamburger from "../Hamburger/Hamburger";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import RISHA from "./risha.png";
import IIT from "./iittp.png";
import { Divider } from "@material-ui/core";
import Logo from "../safar.png";
import Language from "../../../LanguageSelector";
import { useTranslation } from "react-i18next";

function Toolbar(props) {
  const { t } = useTranslation();
  return (
    <Headroom>
      <div className="toolbarM">
        <div className="toolbar_navigation">
          <div className="toggle_toolbar_button">
            <Hamburger click={props.SideToggle} />
          </div>
          <div className="toolbar_logo_align">
            <img className="toolbar_logo_image" src={IIT} alt="iitt_logo" />
            <Divider orientation="vertical" flexItem />
            <img className="toolbar_logo_image" src={RISHA} alt="risha_logo" />
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="toolbar_logo toolbar_navigation_items">
              <img
                style={{ width: "200px", height: "56px" }}
                alt="covid_safar"
                src={Logo}
              />
              {/* COVID Diaries */}
            </div>
          </Link>
          <div className="spacer" />
          <div className="toolbar_navigation_items">
            <ul>
              <li>
                <Link to="/stories">{t("Read")}</Link>
              </li>
              <li>
                <a
                  href="https://forms.gle/TuHpKdWhU5oqmZHk6"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("Write")}
                </a>
              </li>
              <li>
                <Language />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Headroom>
  );
}

export default Toolbar;
