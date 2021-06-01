import React, { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Stories from "./components/stories/stories";
import HomePage from "./components/homePage/homepage";
import COVIDExperiences from "./components/writeStory/form"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Story from "./components/singleStory/mobileStory";
import Flip from "./components/singleStory/flipPage";
import useViewport from "./components/utility/useView";
import "./i18n";
import AuthWithHistory from "./components/authProvider/authProviderWithHistory";
import { env } from "./environment";
import Login from "./components/auth0/login";
import Dashboard from "./components/dashboard/dashboard";
import ProtectedRoute from "./components/authProvider/protectedRoute";

function App() {
  // Set the base url from environment file
  const base_url = env().mode === "prod" ? "/covidsafar" : "";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let distanceY = window.pageYOffset || document.documentElement.scrollTop;
      let shrinkOn = 200;
      const headerEl = document.getElementById("toolbar-top");

      if (distanceY > shrinkOn) {
        headerEl.classList.add("smaller");
      } else {
        headerEl.classList.remove("smaller");
      }
    });
  });

  const [sortingDate, setSortingDate] = useState("newest");
  const [coverage, setCoverage] = useState("global");
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");

  const IndivisualStory = () => {
    const { width } = useViewport();
    if (width >= 1050) {
      return <Flip width={width} />;
    } else if (width >= 768) {
      return <Flip width={width} />;
    } else {
      return <Story width={width} />;
    }
  };

  const StoriesM = () => (
    <Stories
      setPage={setPage}
      setSortingDate={setSortingDate}
      page={page}
      sortingDate={sortingDate}
      coverage={coverage}
      setCoverage={setCoverage}
      searchString={searchString}
      setSearchString={setSearchString}
    />
  );

  return (
    <Router className="App">
      <AuthWithHistory>
        <Navigation />
        <Route exact path="/">
          <Redirect to={base_url} />
        </Route>
        <Route exact path="/stories">
          <Redirect to={base_url + "/stories"} />
        </Route>
        <Route exact path="/login">
          <Redirect to={base_url + "/login"} />
        </Route>
        <Route exact path="/dashboard">
          <Redirect to={base_url + "/dashboard"} />
        </Route>
        <Route
          exact
          path="/story/:id"
          render={(props) => {
            return (
              <Redirect
                to={"/covidsafar" + "/story/" + props.match.params.id}
              />
            );
          }}
        ></Route>
        <div className="Appcontainer">
          <Route exact path={base_url} component={HomePage} />
          <Route exact path={base_url + "/stories"} component={StoriesM} />
          <Route
            exact
            path={base_url + "/story/:id"}
            component={IndivisualStory}
          />{" "}
          <Route exact path={base_url + "/login"} component={Login} />{" "}
          <ProtectedRoute
            exact
            path={base_url + "/dashboard"}
            component={Dashboard}
          />
        </div>
      </AuthWithHistory>
    </Router>
  );
}

export default App;
