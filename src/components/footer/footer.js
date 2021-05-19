import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div class="body">
      <footer id="red">
        <h1 class="text">COVID Safar</h1>
        <h2 class="text2">
          Disclaimer : COVID Safar is under active development and all the data
          taken from another source have not been verifies by us. The
          information may or may not been usefull as it depends upon NLP
          processsing.The developers are not responsible for any damaged caused.
        </h2>
        <h2 class="text21">
          If you are facing any problem contact us by filling this form
        </h2>
        <h2 class="text3">
          Copyright &copy; {new Date().getFullYear()} COVID Safar
        </h2>
      </footer>
    </div>
  );
};

export default Footer;
