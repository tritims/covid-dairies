import { Link } from "react-router-dom";
import React from "react";
import "./SideDrawer.css";
import Language from "../../../LanguageSelector";
import { useTranslation } from "react-i18next";
import Logo from "../safar.png";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@material-ui/core";

function SideDrawer(props) {
  let side = "side-drawer";
  if (props.show) side = "side-drawer open";
  const { t } = useTranslation();

  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  return (
    <nav className={side}>
      <Link
        onClick={() => props.click(false)}
        to="/"
        style={{ textDecoration: "none" }}
      >
        <img
          className="toolbar_logo"
          alt="covid-safar"
          style={{ width: "200px", height: "56px" }}
          src={Logo}
        />{" "}
        <span className="sidebar_risha_lab"> An initiative by RISHA Lab</span>
        {/* <div className="toolbar_logo">COVID Safar</div> */}
      </Link>
      <div className="sidebar_navigation_items">
        <ul>
          <li>
            <Link onClick={() => props.click(false)} to="/stories">
              {t("Read")}
            </Link>
          </li>
          <li>
          <Link onClick={() => props.click(false)} to="/write">
              {t("Write")}
            </Link>
          </li>
          {!isLoading ? (
            isAuthenticated ? (
              <>
                {" "}
                <li>
                  <Link onClick={() => props.click(false)} to="/dashboard">{t("Dashboard")}</Link>
                </li>{" "}
                <li
                  onClick={() =>
                    logout({
                      returnTo: window.location.origin + "/covidsafar",
                    })
                  }
                >
                  {" "}
                  <Link to="#">
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ color: "#f50057" }}
                    ></i>
                  </Link>
                </li>
              </>
            ) : (
              <li onClick={() => loginWithRedirect()}>
                <Link to="#">{t("Login")}</Link>
              </li>
            )
          ) : (
            <li>
              <CircularProgress color="secondary" size={20} />
            </li>
          )}
          <li>
            <Language />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideDrawer;
