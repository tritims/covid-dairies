import "./mobileStory.css";
import FlipPage from "react-flip-page";
import Spinner from "../loading/loading";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getImage } from "./imageGetter";
import { useHistory } from "react-router-dom";
import { Button, Chip } from "@material-ui/core";
import Swal from "sweetalert2";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { constants } from "../../constants"

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

function MobileStory({ width }) {
  const [story, setStory] = useState();
  let { id } = useParams();
  const [images, setImage] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStory = async () => {
      const res = await axios.get(
        `${constants().serverBaseUrl}/id=${id}`
      );
      setStory(res.data);
      setImage(getImage(res.data.keywords, res.data.content.length));
    };
    fetchStory();
  }, [id]);
  const history = useHistory();
  return (
    <div className="mobilecontainer" style={{ paddingBottom: "10px" }}>
      <div className="shareButtton">
        <Button variant="contained" onClick={() => history.goBack()}>
          <i className="fas fa-backward"></i>
        </Button>
        <div style={{ margin: "15px" }}></div>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/story/${id}`
            );
            Swal.fire("Link copied successfully", "", "success");
          }}
          variant="contained"
          color="secondary"
        >
          <i className="fas fa-share-alt"></i>
        </Button>
      </div>
      {story ? (
        <FlipPage
          height={600}
          width={width > 450 ? 420 : 320}
          orientation={"horizontal"}
          className={"mobilebooks  mobileneon-border"}
          pageBackground={"#F1E3D0"}
          animationDuration={300}
          showSwipeHint={true}
          flipOnTouch
        >
          <article className="mobilCover">
            <div style={{ textAlign: "center" }}>
              <div className="wavy-h2">
                <span className="pageCoverTitle">{story && story.title}</span>{" "}
                <div>
                  {story.author ? (
                    <>
                      <i>{t("By")} </i> <div>{story.author}</div>
                    </>
                  ) : (
                    story.source && (
                      <>
                        <i>{t("Source")}:</i> {story.source}
                      </>
                    )
                  )}
                </div>
                <span>
                  {t("Date")} : {moment(story.dateTime).format("D MMMM YYYY")}
                </span>
              </div>
              <br />
              <div>
                {t("Keywords")}:
                {story &&
                  story.keywords &&
                  story.keywords.map((item, i) => {
                    return (
                      <Chip
                        className="storyChip"
                        key={item}
                        label={item}
                        style={{
                          background: `${colorArray[i]}`,
                          color: "white",
                          margin: "2px",
                        }}
                        size="small"
                      />
                    );
                  })}
              </div>
            </div>
          </article>

          {story.content.map((item, i) => (
            <article className="mobilearticle" key={i + 10}>
              <div className="mobileImageContainer">
                <img
                  src={images.length && images[i] + ".jpg"}
                  alt={"My" + i * 101}
                  className="mobileImage"
                />
              </div>

              <p className="mobilearticleContent">{item}</p>
              <div className="mobilearticlefooter">{i + 1}</div>
            </article>
          ))}
          <article className="mobilCover">
            <h1>{t("The End")}</h1>
          </article>
        </FlipPage>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default React.memo(MobileStory);
