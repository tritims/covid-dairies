import React, { Component } from "react";
import "./emoji.css";

export default class FacebookEmoji extends Component {
  render() {
    let Emoji = emojis["like"];
    if (this.props.hasOwnProperty("type")) {
      Emoji = emojis[this.props.type]
        ? emojis[this.props.type]
        : emojis["like"];
    }
    return (
      <div id="zama-emoji">
        <Emoji size={this.props.size} />
      </div>
    );
  }
}

const emojis = {
  Fear: (props) => (
    <div
      className={"zama-emoji emoji--fear " + (props.size ? props.size : "md")}
    >
      <div className="emoji__face">
        <div className="emoji__eyebrows" />
        <div className="emoji__eyes" />
        <div className="emoji__mouth" />
      </div>
    </div>
  ),

  Like: (props) => (
    <div
      className={"zama-emoji emoji--like " + (props.size ? props.size : "md")}
    >
      <div className="emoji__hand">
        <div className="emoji__thumb" />
      </div>
    </div>
  ),
  Love: (props) => (
    <div
      className={"zama-emoji emoji--love " + (props.size ? props.size : "md")}
    >
      <div className="emoji__heart" />
    </div>
  ),
  Haha: (props) => (
    <div
      className={"zama-emoji emoji--haha " + (props.size ? props.size : "md")}
    >
      <div className="emoji__face">
        <div className="emoji__eyes" />
        <div className="emoji__mouth">
          <div className="emoji__tongue" />
        </div>
      </div>
    </div>
  ),
  Happy: (props) => (
    <div
      className={"zama-emoji emoji--yay " + (props.size ? props.size : "md")}
    >
      <div className="emoji__face">
        <div className="emoji__eyebrows" />
        <div className="emoji__mouth" />
      </div>
    </div>
  ),
  Surprise: (props) => (
    <div
      className={"zama-emoji emoji--wow " + (props.size ? props.size : "md")}
    >
      <div className="emoji__face">
        <div className="emoji__eyebrows" />
        <div className="emoji__eyes" />
        <div className="emoji__mouth" />
      </div>
    </div>
  ),
  Sad: (props) => (
    <div
      className={"zama-emoji emoji--sad " + (props.size ? props.size : "md")}
    >
      <div className="emoji__face">
        <div className="emoji__eyebrows" />
        <div className="emoji__eyes" />
        <div className="emoji__mouth" />
      </div>
    </div>
  ),
  Angry: (props) => (
    <div
      className={"zama-emoji emoji--angry " + (props.size ? props.size : "md")}
    >
      <div className="emoji__face">
        <div className="emoji__eyebrows" />
        <div className="emoji__eyes" />
        <div className="emoji__mouth" />
      </div>
    </div>
  ),
};
