import React from "react";
import { useTranslation } from "react-i18next";
import "./language.css";
import { useLocation } from "react-router-dom";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("lang", event.target.value);
  };
  const usePathname = () => {
    const location = useLocation();
    let pname = location.pathname;
    return pname.includes("story") || pname.includes("edit");
  };

  return (
    <div className="select">
      <select
        value={
          localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
        }
        onChange={changeLanguage}
        disabled={usePathname()}
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
