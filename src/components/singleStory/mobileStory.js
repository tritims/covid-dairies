import "./mobileStory.css";
import FlipPage from "react-flip-page";
import Spinner from "../loading/loading";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MobileStory({ width }) {
  const [story, setStory] = useState();
  let { id } = useParams();

  useEffect(() => {
    const fetchStory = async () => {
      const data = await axios.get(`http://localhost:5000/api/v1/id=${id}`);
      setStory(data.data);
    };
    fetchStory();

    // console.log(story && story.content && story.content[0]);
  }, [id]);
  return (
    <div className="mobilecontainer">
      {story ? (
        <FlipPage
          height={600}
          width={width > 450 ? 420 : 320}
          orientation={"horizontal"}
          className={"mobilebooks  mobileneon-border"}
          pageBackground={"#F1E3D0"}
          animationDuration={300}
          showSwipeHint={true}
          // disableSwipe={true}
          flipOnTouch
        >
          <article className="mobilCover">
            <h1>COVID Diary</h1>
          </article>
          {story.content.map((item, i) => (
            <article className="mobilearticle" key={i + 10}>
              <div className="mobilearticlefooter">{i + 1}</div>
              <div className="mobileImageContainer">
                <img
                  className="mobileImage"
                  alt={"My" + i}
                  src="https://cdn.fastly.picmonkey.com/content4/previews/quarantine/quarantine_14_550.png"
                />
              </div>

              <p className="mobilearticleContent">{item}</p>
            </article>
          ))}
          <article className="mobilCover">
            <h1>THE END</h1>
          </article>
        </FlipPage>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default MobileStory;
