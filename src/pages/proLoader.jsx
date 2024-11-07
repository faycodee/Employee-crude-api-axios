import React, { useEffect } from "react";
import "./preloader.css";
import { preLoaderAnim } from "./../animation/index";

const Preloader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <>
      <div className="preloader flex flex-col">
        <div className=" mb-[280px]">
          {" "}
          <span className="text-blue-500 font-extrabold font-mono text-[30px]">
          Page loading ...{" "}
          </span>
        </div>
        <div className="texts-container">
          <span>
          <img
            src="/mygif.gif"
            style={{ zIndex: 60 }}
            width={"50px"}
            alt=""
            srcset=""
          />{" "}
          </span>
          &nbsp;
          <span>Intelligence, </span>
          <span>Creativity, </span>
          <span>success.</span>
          {/* <img src="/mylo.gif" width={"50px"} alt="" srcset="" /> */}
        </div>
      </div>
    </>
  );
};

export default Preloader;
