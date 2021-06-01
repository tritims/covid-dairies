import React, { useEffect, useState } from "react";
import { TextField, MenuItem, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Story from "./storyv2/story";
import "./stories.css";
import axios from "axios";
import useViewport from "../utility/useView";
import SearchBar from "../searchbar/searchbar";
import Spinner from "../loading/loading";
import { getImage } from "../singleStory/imageGetter";
import { useTranslation } from "react-i18next";
import { constants } from "../../constants"

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
  const [storyData, setStory] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [storyCount, setStoryCount] = useState(0);
  const { width } = useViewport();
  const [images, setImages] = useState([]);
  const { t } = useTranslation();

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

  let lang = localStorage.getItem("lang");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          // `https://covidsafarv1.herokuapp.com/api/v1/?language=${lang}&date=${sortingDate}&page=${page}&coverage=${coverage}&search=${searchString}`,
          `${constants().serverBaseUrl}?language=${lang}&date=${sortingDate}&page=${page}&coverage=${coverage}&search=${searchString}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const res = data.data;
        let noStory = res[0].count;
        res.shift();
        setStoryCount(noStory);
        setPageCount(Math.floor(noStory / 9 + 1));
        setStory(res);
        setImages(getImage(["random", "covid", "oxygen"], res.length));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [page, sortingDate, coverage, searchString, lang]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  const AllStoriesv2 = () => (
    <>
      {storyData.length >= 1 &&
        storyData.map((item, i) => {
          return (
            <Story
              width={width}
              data={item}
              key={item._id}
              image={window.location.origin + images[i] + ".jpg"}
            />
          );
        })}
    </>
  );
  const classes = useStyles();

  return (
    <div className="storiesBackground">
      {storyData ? (
        <>
          <div className="filterclass">
            <span
              style={{
                color: "#fff",
                marginTop: "10px",
              }}
            >
              {(page - 1) * 9 + 1} -{" "}
              {page * 9 < storyCount ? page * 9 : storyCount} / {storyCount} {" "}  {t('Stories')}
            </span>
            <div
              style={{
                padding: "10px",
              }}
            >
              {/* For Date */}
              <TextField
                style={{ marginRight: "10px" }}
                id="select"
                label={t("Sort by date")}
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
                  {t("Newest first")}
                </MenuItem>
                <MenuItem
                  value="oldest"
                  onClick={() => {
                    setSortingDate("oldest");
                    setPage(1);
                  }}
                >
                  {t("Oldest first")}
                </MenuItem>
              </TextField>
              {/* For coverage */}
              <TextField
                id="select2"
                label={t("Stories")}
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
                  {t("World")}
                </MenuItem>
                <MenuItem
                  value="india"
                  onClick={() => {
                    setCoverage("india");
                    setPage(1);
                  }}
                >
                  {t("India")}
                </MenuItem>
              </TextField>{" "}
            </div>
            <SearchBar
              searchString={searchString}
              setSearchString={setSearchString}
              setPage={setPage}
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

export default React.memo(Stories);
