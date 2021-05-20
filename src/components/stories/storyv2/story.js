import React from "react";
import { Chip, Button } from "@material-ui/core";
import Emoji from "../../../components/emoji/index";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./story.css";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

var colorArray = [
  "#FF6633",
  "#FF33FF",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const Story = ({ data, image }) => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <div className={"news-card"}>
      <div
        style={{
          position: "absolute",
          cursor: "pointer",
          zIndex: 2,
          right: 0,
        }}
      >
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/story/${data._id}`
            );
            Swal.fire("Link copied succesfully", "", "success");
          }}
          variant="contained"
          color="secondary"
        >
          <i className="fas fa-share-alt"></i>
        </Button>
      </div>
      <div className="news-card__card-link"></div>
      <img
        src={
          image
            ? image + ".jpg"
            : "https://cdn.dribbble.com/users/1016207/screenshots/3391077/14.jpg"
        }
        alt=""
        className="news-card__image"
      />
      <div className="news-card__text-wrapper">
        <div className="news-card__title_wrapper">
          <h2 className="news-card__title">{data && data.title} </h2>
        </div>
        <div className="news-card__post-date">
          <div>
            {moment(data.dateTime && data.dateTime).format("D MMMM YYYY")}
            {data.cities.length > 0 && (
              <span>
                {" "}
                📍
                {data.cities.map((city, i) => (
                  <Chip
                    size="small"
                    className="storyChip"
                    key={city}
                    label={city}
                    style={{ marginLeft: "5px", opacity: "0.8" }}
                  />
                ))}
              </span>
            )}
            {data &&
              data.emotions.map((item) => (
                <span key={item} style={{ marginLeft: "5px", opacity: "0.8" }}>
                  <Emoji type={item} size="xs" />
                </span>
              ))}
          </div>
          {data.source && (
            <div style={{ position: "relative", zIndex: 10, margin: 5 }}>
              {t("Source")} :
              <a
                href={data.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "Mulish",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                {" "}
                {data.source}
              </a>
            </div>
          )}
        </div>
        <div className="news-card__details-wrapper">
          <div className="news-card__excerpt">
            {data &&
              data.keywords &&
              data.keywords.map((item, i) => {
                if (i < 3)
                  return (
                    <Chip
                      className="storyChip"
                      key={item}
                      label={item}
                      style={{
                        background: `${colorArray[i]}`,
                        color: "white",
                        marginLeft: "5px",
                      }}
                    />
                  );
                return null;
              })}
          </div>

          <div
            onClick={() => {
              history.push(`/story/${data._id}`);
            }}
            className="news-card__read-more_container"
          >
            <span className="news-card__read-more">
              {t("Read more")} <i className="fas fa-long-arrow-alt-right"> </i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
