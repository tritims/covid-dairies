import React, { useState, useEffect } from "react";
import "./dash.css";
import Login from "../googleLogin/login";
import Logout from "../googleLogin/logout";
import Spinner from "../loading/loading";
import axios from "axios";
import { Link } from "react-router-dom";

function Dash({ isAuth, loading, setAuth, setLoading }) {
  const [profile, setProfile] = useState();
  const [mount, setMount] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/private/dashboard",
        JSON.stringify({ token: token }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const result = res.data;
      let tempProfile;
      if (result.success) {
        tempProfile = {
          name: result.name,
          img: result.img,
          stories: result.stories,
        };
        setProfile(tempProfile);
      }
    };
    isAuth && fetchProfile();
    return () => {
      setMount(false); // Additional loading for fetching profile
    };
  }, [isAuth]);
  return (
    <>
      {!loading ? (
        isAuth ? (
          <div className="main-content">
            <header className="header-wrapper">
              <h2>
                <label htmlFor="nav-toggle"></label>
                Dashboard
              </h2>

              <div className="user-wrapper">
                {" "}
                <img
                  src={profile && profile.img}
                  width="40px"
                  height="40px"
                  alt="profile-img"
                  className="profile-img"
                />
                <div className="google-user">
                  <h4>{profile && profile.name}</h4>
                </div>
              </div>
              <div>
                <Logout setAuth={setAuth} setLoading={setLoading} />
              </div>
            </header>

            <main>
              <h1>Your Stories</h1>
              <div className="cards">
                {profile &&
                  profile.stories.map((story) => (
                    <div className="card-single" key={story.title}>
                      <div>
                        <h3>{story && story.title}</h3>
                        <h4>Created : {story && story.dateTime}</h4>
                        <div className="dashboardIconContainer">
                          <span className="dashboardIcon">
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "green",
                              }}
                              to={`/edit/${story._id.$oid}`}
                            >
                              {" "}
                              <i className="fas fa-edit"></i>
                            </Link>
                          </span>
                          {"  "}
                          <span className="dashboardIcon">
                            <Link
                              style={{ textDecoration: "none", color: "green" }}
                              to={`/story/${story._id.$oid}`}
                            >
                              {" "}
                              <i className="fas fa-book-reader"></i>
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </main>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Login setAuth={setAuth} setLoading={setLoading} />
          </div>
        )
      ) : (
        <Spinner />
      )}
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
