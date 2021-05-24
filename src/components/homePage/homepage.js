import React from "react";
import "./homepage.css";
import Safar from "./safar.jpg";
import { Typography, Paper, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useTranslation } from "react-i18next";

const SimpleSlider = () => {
  const { t } = useTranslation();
  const history = useHistory();

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
      <div>
        <div className="featuresTitle"> {t("Featured1 Title")}</div>
        <h4 className="featuredAuthor">{t("Featured1 Author")} </h4>
        <Divider />
        <p className="ptagdescription">{t("Featured1 Content")}....</p>{" "}
        <div
          onClick={() => history.push("/story/60a4ce7a12891c0feea04228")}
          className="news-card__read-more_container"
        >
          <span className="news-card__read-more">
            {t("Read more")} <i className="fas fa-long-arrow-alt-right"> </i>
          </span>
        </div>
      </div>
      <div>
        <div className="featuresTitle"> {t("Featured2 Title")}</div>
        <h4 className="featuredAuthor">{t("Featured2 Author")} </h4>
        <Divider />
        <p className="ptagdescription">{t("Featured2 Content")}....</p>{" "}
        <div
          onClick={() => history.push("/story/60a4ce7a12891c0feea04228")}
          className="news-card__read-more_container"
        >
          <span className="news-card__read-more">
            {t("Read more")} <i className="fas fa-long-arrow-alt-right"> </i>
          </span>
        </div>
      </div>
    </Slider>
  );
};

const Wavy = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="contain-wavy">
        <div className="wavy-content">
          <div className="banner-header">
            <img
              style={{ borderRadius: "5px" }}
              className="wavy-book"
              src={Safar}
              alt="Safarimage"
            />
            <h1 className="wavy-h1">{t("tagline")}</h1>
            <h3 className="wavy-h3">{t("RISHA initiative")}</h3>
          </div>
          <div>
            <Paper elevation={0} className="Featurecard-Container">
              <Typography
                variant="h4"
                component="h4"
                style={{
                  fontFamily: "Mulish",
                  marginTop: "7px",
                  textAlign: "center",
                }}
              >
                {t("Featured")}
              </Typography>

              <SimpleSlider />
            </Paper>
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

      <Footer />
    </div>
  );
};

export default Wavy;
