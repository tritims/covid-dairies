import React from "react";
import "./homepage.css";
// import Book from "./book.svg";
import Safar from "./safar.jpg";
import Featured1 from "./featured1.jpg";
import Featured3 from "./featured3.jpg";
import { Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Footer from "../footer/footer";

import { useTranslation } from "react-i18next";

const Wavy = () => {
  const { t } = useTranslation();

  const history = useHistory();
  return (
    <div>
      <div className="contain-wavy">
        <div className="wavy-content">
          <div className="wavy-text">
            <h2 className="wavy-h2">{t("COVID Safar")}</h2>
            <h1 className="wavy-h1">{t("tagline")}</h1>
            <h3 className="wavy-h3">{t("RISHA initiative")}</h3>

            <div className="frame">
              <Link to="/stories">
                <button className="custom-wavy-btn btn-7">
                  {" "}
                  <span>{t("Read")}</span>
                </button>
              </Link>
              <Link to="/">
                <button className="custom-wavy-btn btn-7">
                  <span>{t("Write")}</span>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img
              style={{ borderRadius: "5px" }}
              className="wavy-book"
              src={Safar}
              alt="Safarimage"
            />
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1620307143">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      {/* 
      <div>
        <div className="showCasecard">
          <div className="showCasethumbnail">
            <img
              className="showCaseimgleft"
              src={Safar}
              style={{ height: "100%" }}
              alt="covid-safar"
            />
          </div>
          <div className="showCaseright">
            <h1 className="showCaseh1">What is COVID Safar?</h1>

            <div className="showCaseseparator"></div>
            <p className="showCasep">Description goes here</p>
          </div>
          <div className="absolutesmall">
            <h1 className="showCaseh1">What is COVID Safar ?</h1>

            <div className="showCaseseparator"></div>
            <p className="showCasep">Description goes here</p>
          </div>
          <h6 className="showCaseh6">A peek into COVID Journey</h6>
        </div>
      </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          style={{ fontFamily: "Mulish" }}
        >
          {t("Featured")}
        </Typography>
        <div className="blog-card">
          <div className="meta">
            <div
              className="photo"
              style={{
                backgroundImage: `url(${Featured1})`,
              }}
            ></div>
          </div>
          <div className="description">
            <h2>How I managed to boost my oxygen levels at home</h2>
            <h4>Nandita Goel </h4>
            <p className="ptagdescription">
              Nandita Goel and her parents, both in their 60s contracted
              COVID-19 in the month of April and underwent home isolation. While
              all of their symptoms started similarly, Nandita's recovery was
              slow and left her with a lot of lingering symptoms. She urges
              younger people to not take the virus lightly and lists what she
              did to boost her oxygen levels at home.Our COVID journey started
              when my father complained saying he was feeling slightly feverish
              and had a cold. He immediately isolated himself from me and my
              mother. Within the next two-three days, me and my mother I, too,
              developed symptoms. While mom had a fever, I developed slight
              throat pain.....
            </p>
            <p className="read-more">
              <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => history.push("/story/60a4ce7a12891c0feea04228")}
              >
                {t("Read more")}
              </span>
            </p>
          </div>
        </div>
        <div className="blog-card alt">
          <div className="meta">
            <div
              className="photo"
              style={{
                backgroundImage: `url(${Featured3})`,
              }}
            ></div>
          </div>
          <div className="description">
            <h2>
              How my 80-year-old grandpa with severe asthma survived COVID-19
            </h2>
            <h4>Anonymous</h4>
            <p className="ptagdescription">
              A doctor from Amravati, currently on COVID duty recounts the time
              when COVID hit home and infected her 80-year-old asthmatic
              grandfather. She shares her experience of getting tested early and
              the strong willpower which helped her grandfather defeat the
              virus. Here's their COVID story.It all started in January 2021. We
              stay with our grandparents in Amravati. My mother being a
              paediatrician and me, an MBBS intern had to go to the hospital
              daily for work but we made sure to take all the necessary
              precautions and my father, an engineer used to assist my
              grandparents in their daily routine as he had to work from
              home.....
            </p>
            <p className="read-more">
              <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => history.push("/story/60a4ceb312891c0feea0422d")}
              >
                {t("Read more")}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wavy;
