import React, { useEffect, useState } from "react";
import { TextField, MenuItem, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Story from "./storyv2/story";
import "./stories.css";
import axios from "axios";
import useViewport from "../utility/useView";
import SearchBar from "../searchbar/searchbar";
import Spinner from "../loading/loading";

const Stories = ({
  page,
  sortingDate,
  setPage,
  setSortingDate,
  coverage,
  setCoverage,
  searchString,
  setSearchString,
}) => {
  const [storyData, setStory] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const { width } = useViewport();

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormLabel-root": {
        color: "#F5F5DC",
      },
      "& .MuiInputBase-input": {
        color: "#fff",
      },
    },
  }));

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/api/v1/?date=${sortingDate}&page=${page}&coverage=${coverage}&search=${searchString}`
        );
        const res = data.data;
        let noStory = res[0].count;
        res.shift();
        setPageCount(Math.floor(noStory / 9 + 1));
        setStory(res);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [page, sortingDate]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  const AllStoriesv2 = () => (
    <>
      {storyData.length >= 1 &&
        storyData.map((item) => {
          return <Story width={width} data={item} key={item._id} />;
        })}
    </>
  );
  const classes = useStyles();

  return (
    <div className="storiesBackground">
      {storyData.length > 0 ? (
        <>
          <div className="filterclass">
            <div
              style={{
                padding: "10px",
              }}
            >
              {/* For Date */}
              <TextField
                style={{ marginRight: "10px" }}
                id="select"
                label="Order"
                className={classes.root}
                value={sortingDate}
                select
              >
                <MenuItem
                  value="newest"
                  onClick={() => {
                    setSortingDate("newest");
                    setPage(1);
                  }}
                >
                  Newest
                </MenuItem>
                <MenuItem
                  value="oldest"
                  onClick={() => {
                    setSortingDate("oldest");
                    setPage(1);
                  }}
                >
                  Oldest
                </MenuItem>
              </TextField>
              {/* For coverage */}
              <TextField
                id="select2"
                label="Coverage"
                className={classes.root}
                value={coverage}
                select
              >
                <MenuItem
                  value="global"
                  onClick={() => {
                    setCoverage("global");
                    setPage(1);
                  }}
                >
                  Global
                </MenuItem>
                <MenuItem
                  value="india"
                  onClick={() => {
                    setCoverage("india");
                    setPage(1);
                  }}
                >
                  India
                </MenuItem>
              </TextField>{" "}
            </div>
            <SearchBar
              searchString={searchString}
              setSearchString={setSearchString}
            />
          </div>

          <div className="Storycontent-wrapper">
            <AllStoriesv2 />
          </div>
          <div className="paginationClass">
            <Pagination
              count={pageCount}
              variant="outlined"
              page={page}
              size={width && width < 450 ? "small" : "medium"}
              onChange={handlePage}
            />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Stories;
