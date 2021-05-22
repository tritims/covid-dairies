import React from "react";
import { useTranslation } from "react-i18next";
import "./language.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("lang", event.target.value);
  };

  // return (
  //   <div onChange={changeLanguage}>
  //     <input type="radio" value="en" name="language" defaultChecked /> English
  //     <input type="radio" value="hi" name="language" /> Hindi
  //   </div>
  // );
  return (
    <div className="select">
      <select
        value={
          localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
        }
        onChange={changeLanguage}
      >
        <option className="selectOption" value="en" name="language">
          English
        </option>
        <option value="hi" name="language">
          हिन्दी
        </option>
        <option value="te" name="language">
          తెలుగు
        </option>
      </select>
    </div>
  );
};

export default LanguageSelector;
