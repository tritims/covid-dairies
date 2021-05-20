import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="body">
      <footer id="red">
        <h1 className="text">COVID Safar</h1>
        <h2 className="text2">
          Disclaimer : The platform is under active development.The content on
          this platform comes from publicly available sources and our users. We
          do not fact check any of the contents and thereby hold no
          responsibility for story that is non factual or controversial.
          Furthermore, we do take care to prevent abusive language through our
          algorithms but cannot ensure absence of abusive language stories that
          bypass our algorithms.
        </h2>
        <h2 className="text21">
          If you are facing any problem contact us by filling this form
        </h2>
        <h2 className="text3">
          Copyright &copy; {new Date().getFullYear()} COVID Safar
        </h2>
      </footer>
    </div>
  );
};

export default Footer;
