import React, { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Stories from "./components/stories/stories";
import HomePage from "./components/homePage/homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Story from "./components/singleStory/mobileStory";
import Flip from "./components/singleStory/flipPage";
import useViewport from "./components/utility/useView";
import "./i18n";

function App() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let distanceY = window.pageYOffset || document.documentElement.scrollTop;
      let shrinkOn = 200;
      const headerEl = document.getElementById("toolbar-top");

      if (distanceY > shrinkOn) {
        console.log("Added smaller");
        headerEl.classList.add("smaller");
      } else {
        console.log("Removed smaller");
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
      <Navigation />
      <div className="Appcontainer">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/stories" component={StoriesM} />
        <Route exact path="/story/:id" component={IndivisualStory} />
      </div>
    </Router>
  );
}

export default App;
