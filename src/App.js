import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Stories from "./components/stories/stories";
import HomePage from "./components/homePage/homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Story from "./components/singleStory/mobileStory";
import Flip from "./components/singleStory/flipPage";
import useViewport from "./components/utility/useView";

function App() {
  // const [isAuth, setAuth] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [sortingDate, setSortingDate] = useState("newest");
  const [coverage, setCoverage] = useState("global");
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const loginFromToken = async () => {
  //     if (token) {
  //       try {
  //         const res = await axios.post(
  //           "http://localhost:5000/auth/google",
  //           JSON.stringify({ token: token }),
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "Access-Control-Allow-Origin": "*",
  //             },
  //           }
  //         );
  //         if (res.data.auth) {
  //           setAuth(true);
  //         } else {
  //           setAuth(false);
  //           localStorage.removeItem("token");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   loginFromToken();
  // }, [setAuth, setLoading]);
  // console.log("HEllo", isAuth);

  // const DashWithProps = () => (
  //   <Dashboard
  //     isAuth={isAuth}
  //     setAuth={setAuth}
  //     setLoading={setLoading}
  //     loading={loading}
  //   />
  // );
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
