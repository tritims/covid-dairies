import React, { useState } from "react";
import "./searchbar.css";
import { InputBase, Paper } from "@material-ui/core";
const Searchbar = ({ searchString, setSearchString }) => {
  const [tempString, setTempString] = useState("");

  const handleChage = (e) => {
    setTempString(e.target.value);
  };

  const submit = () => {
    setSearchString(tempString);
  };

  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <Paper elevation={1} id="search-box">
        <form id="search-form" onSubmit={submit}>
          <InputBase
            id="search-text"
            placeholder={searchString || "Search story"}
            autoComplete="off"
            type="text"
            value={tempString}
            onChange={(e) => handleChage(e)}
          />
          <button
            id="search-button"
            type="submit"
            // onKeyDown={submit}
            // onClick={submit}
          >
            <span>
              <i className="fas fa-search"></i>
            </span>
          </button>
        </form>
      </Paper>
    </div>
  );
};

export default Searchbar;
