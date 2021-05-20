import React, { useState } from "react";
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
