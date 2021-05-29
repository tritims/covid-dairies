import React, { useEffect } from "react";
import "./homepage.css";
import Safar from "./virus.svg";
import SafarTiny from "./virus_tiny.png";
import { Typography, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Fade from "@material-ui/core/Fade";
import { ProgressiveImage } from "react-progressive-image-loading";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import featured1 from "./featured1.jpg";
import featured2 from "./featured2.jpg";
import avatar1 from "./a1.png";
import avatar2 from "./a2.png";
import avatar3 from "./a3.png";
import avatar4 from "./a4.png";
import Grid from "@material-ui/core/Grid";

import AOS from "aos";
import "aos/dist/aos.css";

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
    fade: true,
    autoplaySpeed: 4500,
  };
  return (
    <Slider {...settings}>
      <Card elevation={0}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="img"
            height="140"
            src={featured1}
            title="img"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ fontFamily: "Mulish" }}
            >
              {t("Featured1 Title")}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontFamily: "Mulish" }}
            >
              {t("Featured1 Content").slice(0, 220) + "..."}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ float: "right" }}>
          <Button
            size="small"
            color="primary"
            onClick={() => history.push("/story/60a4ce7a12891c0feea04228")}
          >
            {t("Read More")}
          </Button>
        </CardActions>
      </Card>

      <Card elevation={0}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="img"
            height="140"
            image={featured2}
            title="img"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ fontFamily: "Mulish" }}
            >
              {t("Featured2 Title")}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontFamily: "Mulish" }}
            >
              {t("Featured2 Content").slice(0, 220) + "..."}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ float: "right" }}>
          <Button
            size="small"
            color="primary"
            onClick={() => history.push("/story/60a4ce7a12891c0feea04228")}
          >
            {t("Read More")}
          </Button>
        </CardActions>
      </Card>
      {/* <div>
        <div className="featuresTitle"> {t("Featured1 Title")}</div>
        <h4 className="featuredAuthor">{t("Featured1 Author")} </h4>
        <Divider />
        <img
          style={{ borderRadius: "5px" }}
          className="wavy-book"
          src={getImage(t("Featured1 Content"), 1)[0]}
          alt="Safarimage"
        />
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
      </div> */}
    </Slider>
  );
};

const WriteSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  });
  return (
    <div className="write-landing-page">
      <div className="write-landing-content">
        <h2 className="wavy-h1" data-aos="fade-up">
          {t("Publish your COVID story with Covid Safar")}
        </h2>
      </div>

      <a
        href="https://forms.gle/TuHpKdWhU5oqmZHk6"
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          style={{
            margin: "0 auto",
            height: "80px",
            display: "flex",
            fontSize: "3vh",
            fontFamily: "Mulish",
            fontweight: "bold",
          }}
          variant="contained"
          color="secondary"
          data-aos="zoom-in"
        >
          {t("Write Your Story")}
        </Button>
      </a>
    </div>
  );
};

const OurTeamSection = () => {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  });

  return (
    <div className="our-team-container">
      <div className="our-team-content">
        <h1 className="wavy-h1" data-aos="fade-right">
          {t("Our Team")}
        </h1>
      </div>
      <div className="team-members-container" data-aos="fade-left">
        <div className="team-mambers-content">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Card className="dev-card">
                <CardActionArea>
                  <CardMedia
                    image={avatar1}
                    title="img"
                    className="dev-content"
                  />
                  <CardContent className="dev-name">
                    {t("Dr. Sridhar Chimalakonda")}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Card className="dev-card">
                <CardActionArea>
                  <CardMedia
                    image={avatar2}
                    title="img"
                    className="dev-content"
                  />
                  <CardContent className="dev-name">
                    {t("Shriram Shanbhag")}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Card className="dev-card">
                <CardActionArea>
                  <CardMedia
                    image={avatar3}
                    title="img"
                    className="dev-content"
                  />
                  <CardContent className="dev-name">
                    {t("Abhishek Gupta")}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Card className="dev-card">
                <CardActionArea>
                  <CardMedia
                    image={avatar4}
                    title="img"
                    className="dev-content"
                  />
                  <CardContent className="dev-name">
                    {t("Abhay Singh")}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

const Wavy = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="contain-wavy">
        <div className="wavy-content">
        <Grid container>
        <Grid item xs={12} className="mainText">
          {t('Covid Safar')}
        </Grid>
        <Grid item xs={12} className="tagline" style={{textAlign: "center"}}>
        {t("tagline")}
        <ul className="quotes">
            <li>
              {t('quote1')}
            {/* Don't forget where you've been. */}
            </li>
            <li>
              {t('quote2')}
            {/* Don't lose site of where you're going in this journey of life. */}
            </li>           
          </ul>
        </Grid>
        {/* <Grid item xs={12} className="tagline" style={{textAlign: "center"}}>
          
          </ul>
        </Grid> */}
        </Grid>
          
          <div className="banner-header">
            <ProgressiveImage
              preview={SafarTiny}
              src={Safar}
              render={(src, style) => (
                <img
                  style={{ borderRadius: "5px" }}
                  className="wavy-book"
                  src={src}
                  alt="Safarimage"
                />
              )}
            />
            {/* <Fade in={true} timeout={3000}>
              <h1 className="wavy-h1">COVID Safar</h1>
            </Fade> */}
            {/* <Fade in={true} timeout={5000}> 
            <hr/>

            </Fade> */}
            {/* <Fade in={true} timeout={5000}>

              <h1 className="wavy-h1">{t("tagline")}</h1>

            </Fade> */}
            {/* <h3 className="wavy-h3">{t("RISHA initiative")}</h3> */}
          </div>
          {/* <Fade in={true} timeout={5000}>
            <div>
              <Paper elevation={0} className="Featurecard-Container">
                <Typography
                  variant="h4"
                  component="h4"
                  style={{
                    fontFamily: "Mulish",
                    marginTop: "0px",
                    textAlign: "center",
                    // background: "#8080801f",
                    marginBottom: "7px",
                  }}
                >
                  {t("Featured")}
                </Typography>

                <SimpleSlider />
              </Paper>
            </div>
          </Fade> */}
        </div>
      </div>
      {/* <div className="custom-shape-divider-bottom-1620307143">
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
      </div> */}

      {/* <WriteSection />
      <OurTeamSection /> */}

      <Footer />
    </div>
  );
};

export default React.memo(Wavy);
