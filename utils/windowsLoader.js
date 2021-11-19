import React from "react";
import style from "../styles/WindowsLoader.module.css";
const PlaceHoldLoader = () => (
  <div className={`${style.loader_wrapper} my-2`}>
    <div style={{ flex: 0.1, marginRight: "5px" }}>
      <div className={`${style.placeholder} ${style.circle}`}>
        <div className={`${style.animated_background} ${style.circle}`}></div>
      </div>
    </div>
    <div style={{ flex: 1, width: "50%" }}>
      <div className={style.placeholder}>
        <div className={style.animated_background}></div>
      </div>
    </div>
  </div>
);

export default PlaceHoldLoader;
