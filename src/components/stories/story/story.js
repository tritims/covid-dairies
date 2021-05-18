import React from "react";
import { Paper, Typography, Chip } from "@material-ui/core";
import Emoji from "../../../components/emoji/index";
import "./story.css";
import moment from "moment";
import { useHistory } from "react-router-dom";

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

function Story({ data }) {
  const history = useHistory();
  return (
    <>
      <Paper elevation={3} className="storyCard">
        <div>
          <span>
            {moment(data.dateTime && data.dateTime.$date).format(
              "DD MMMM YYYY"
            )}
          </span>

          {data.cities.length > 0 ? (
            <span>
              , 📍
              {data.cities.map((city, i) => (
                <Chip className="storyChip" key={city} label={city} />
              ))}
            </span>
          ) : (
            ""
          )}
        </div>
        <Typography
          variant="h5"
          gutterBottom
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/story/${data._id.$oid}`);
          }}
        >
          {data.title}
        </Typography>{" "}
        <div>
          <div className="margin">
            {data &&
              data.emotions.map((item, i) => (
                <span key={item}>
                  <Emoji type={item} size="xs" />
                </span>
              ))}
          </div>

          {data &&
            data.keywords &&
            data.keywords.map((item, i) => {
              return (
                <Chip
                  className="storyChip"
                  key={item}
                  label={item}
                  style={{ background: `${colorArray[i]}`, color: "white" }}
                />
              );
            })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            Source :{" "}
            <a
              href={data.link}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "None", color: "grey" }}
            >
              {data.source}
            </a>
          </span>
          <span
            style={{ cursor: "pointer", color: "green" }}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/story/${data._id.$oid}`
              );
            }}
          >
            Share{" "}
          </span>
        </div>
      </Paper>
    </>
  );
}

export default Story;
