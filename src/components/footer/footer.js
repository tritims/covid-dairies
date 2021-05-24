import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="body">
      <footer id="red">
        <h2 className="text2">
          Disclaimer : The platform is under active development.The content on
          this platform comes from publicly available sources and our users. We
          do not fact check any of the contents and thereby hold no
          responsibility for story that is non factual or controversial.
          Furthermore, we do take care to prevent abusive language through our
          algorithms but cannot ensure absence of abusive language stories that
          bypass our algorithms.The images used are from copyright free sources.
        </h2>

        <h2 className="text21" style={{ marginTop: "10px" }}>
          for any Feedback, contact us at RISHA Lab, IIT Tirupati |
          <a
            className="footermail"
            href="mailto:rishalab@iittp.ac.in"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            rishalab@iittp.ac.in
          </a>{" "}
        </h2>
        <h2 className="text21" style={{ marginTop: "10px" }}>
          Dr. Sridhar Chimalakonda |
          <a
            rel="noreferrer"
            className="footermail"
            href="mailto:ch@iittp.ac.in"
            target="_blank"
          >
            {" "}
            ch@iittp.ac.in
          </a>
        </h2>
      </footer>
    </div>
  );
};

export default Footer;
