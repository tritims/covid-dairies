import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";
import "./flip.css";
import Spinner from "../loading/loading";
import { Button, Chip } from "@material-ui/core";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { getImage } from "./imageGetter";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Loading from "../stories/storyv2/loading2.jpg";
import { ProgressiveImage } from "react-progressive-image-loading";

const colorArray = [
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

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">{props.children}</div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        {/* <h2 className="page-header"> {props.number}</h2> */}
        <div className="page-image">
          {props.image && (
            <ProgressiveImage
              preview={Loading}
              src={props.image}
              render={(src, style) => (
                <img
                  alt="covid-images"
                  style={style}
                  className="page-image-img"
                  src={src}
                />
              )}
            />
          )}
        </div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number}</div>
      </div>
    </div>
  );
});

const Book = (props) => {
  const [story, setStory] = useState(null);
  let { id } = useParams();
  const [mount, setMount] = useState(true);
  const history = useHistory();
  const [images, setImage] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(
          `https://covidsafarv1.herokuapp.com/api/v1/id=${id}`
        );

        setStory(res.data);
        setImage(getImage(res.data.keywords, res.data.content.length));
      } catch (error) {
        console.error(error);
      }
    };
    fetchStory();
    return () => {
      setMount(false);
    };
  }, [id]);

  return (
    <>
      {story ? (
        <section className="hero is-fullheight">
          <div className="shareButtton">
            <Button onClick={() => history.goBack()} variant="contained">
              <i className="fas fa-backward"></i>
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/story/${id}`
                );
                Swal.fire("Link copied succesfully", "", "success");
              }}
              variant="contained"
              color="secondary"
            >
              <i className="fas fa-share-alt"></i>
            </Button>
          </div>

          <div className="hero-body">
            <div className="storycenter">
              <HTMLFlipBook
                size="fixed"
                width={props.width > 1050 ? 500 : 360}
                height={props.width > 1050 ? 620 : 540}
                showCover={true}
                maxShadowOpacity={0.7}
                id="storyBookContainer"
              >
                <PageCover>
                  <div className="wavy-h2">
                    <span className="pageCoverTitle">
                      {story && story.title}
                    </span>{" "}
                    <div>
                      {" "}
                      {story.author ? (
                        <>
                          <i>By </i>{" "}
                          <div className="coverauthor">{story.author}</div>
                        </>
                      ) : (
                        <>
                          <strong>{t("Source")}:</strong> {story.source}
                        </>
                      )}
                    </div>
                    {story.dateTime && (
                      <span>
                        {t("Date")} :{" "}
                        {moment(story.dateTime).format("D MMMM YYYY")}
                      </span>
                    )}
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
                </PageCover>

                {story.content &&
                  story.content.map((item, i) => (
                    <Page
                      image={images.length > 0 && images[i] + ".jpg"}
                      key={i}
                      number={i + 1}
                    >
                      {item}
                    </Page>
                  ))}
                <PageCover>
                  <h2 className="wavy-h2">The End</h2>
                </PageCover>
              </HTMLFlipBook>
            </div>
          </div>
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default React.memo(Book);
