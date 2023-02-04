import React, { useState } from "react";
import BackDrop from "./BackDrop/BackDrop";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";

function App({ isAuth }) {
  const [isOpen, setOpen] = useState(false);
  const SideToggle = () => {
    setOpen(!isOpen);
  };
  const BackDropClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Toolbar isAuth={isAuth} SideToggle={SideToggle} />
      <SideDrawer isAuth={isAuth} show={isOpen} click={setOpen} />
      {isOpen && (
        <>
          <BackDrop click={BackDropClick} />
        </>
      )}
    </>
  );
}

export default App;
