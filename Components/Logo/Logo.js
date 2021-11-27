import React from "react";
import style from "../../styles/Logo.module.css";

const Logo = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className={style.animate_charcter}> ChatApp</h3>
        </div>
      </div>
    </div>
  );
};

export default Logo;
