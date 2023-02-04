import React, { useState, useEffect } from "react";
import "./dash.css";
// import Login from "../googleLogin/login";
// import Logout from "../googleLogin/logout";
import Spinner from "../loading/loading";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { constants } from '../../constants'
import { useTranslation } from "react-i18next";


function Dash() {
  const [stories, setStories] = useState();
  // const [mount, setMount] = useState(true);
  const { logout, user, getAccessTokenSilently } = useAuth0();
  const { name, picture } = user;
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = await getAccessTokenSilently();
        const res = await axios.get(
          // "http://localhost:5000/api/v1/private/dashboard",
          `${constants().serverBaseUrl}/private/dashboard`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = res.data;
        setStories(result.stories);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProfile();
    // return () => {
    //   setMount(false); // Additional loading for fetching profile
    // };
  }, []);
  return (
    <>
      <div className="main-content">
        <header className="header-wrapper">
          <h2>
            <label htmlFor="nav-toggle"></label>
            {t("Dashboard")}
          </h2>

          <div className="user-wrapper">
            {" "}
            <img
              src={picture && picture}
              width="40px"
              height="40px"
              alt="profile-img"
              className="profile-img"
            />
            <div className="google-user">
              <h4>{name && name}</h4>
            </div>
          </div>
        </header>

        <main>
          <h1>{t("Your Stories")}</h1>
          <div className="cards">
            {stories ? (
              stories.map((story, i) => (
                <div className="card-single" key={story.title + i}>
                  <div>
                    <h3>{story.title && story.title}</h3>
                    <h4>{t("Created")} : {story.dateTime && story.dateTime}</h4>
                    <div className="dashboardIconContainer">
                      <span className="dashboardIcon">
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                          to={`/edit/${story._id}`}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>
                        </Link>
                      </span>
                      {"  "}
                      <span className="dashboardIcon">
                        <Link
                          style={{ textDecoration: "none", color: "#fff" }}
                          to={`/story/${story._id}`}
                        >
                          {" "}
                          <i className="fas fa-book-reader"></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dash;

// garbage table
{
  /* <div className="recent-grid">
            <div className="projects">
              <div className="card">
                <div className="card-header">
                  <h2>Recent Projects</h2>
                  <button>
                    See all <span className="fas fa-arrow-right"></span>{" "}
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Project Title</td>
                          <td>Department</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Website</td>
                          <td>Frontend</td>
                          <td>
                            <span className="status purple"></span>
                            Review
                          </td>
                        </tr>
                        <tr>
                          <td>Website</td>
                          <td>Frontend</td>
                          <td>
                            <span className="status orange"></span>
                            Pending
                          </td>
                        </tr>
                        <tr>
                          <td>Website</td>
                          <td>Frontend</td>
                          <td>
                            <span className="status pink"></span>
                            In Progress
                          </td>
                        </tr>
                        <tr>
                          <td>Website</td>
                          <td>Frontend</td>
                          <td>
                            <span className="status purple"></span>
                            Review
                          </td>
                        </tr>
                        <tr>
                          <td>Website</td>
                          <td>Frontend</td>
                          <td>
                            <span className="status pink"></span>
                            In Progress
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> */
}
