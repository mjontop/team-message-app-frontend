import React from "react";
import notfound from "../assets/NOTFOUND.svg";

const NOTFOUND = ({ message = "" }) => {
  return (
    <>
      <div className="centered-div">
        <div className="text-center">
          <img
            style={{ height: "50vmin", margin: "5rem 0" }}
            src={notfound.src}
          />
          <p className="display-6">
            {message !== "" ? message : `Oops! Looks Like Page isn't Available`}
          </p>
        </div>
      </div>
    </>
  );
};

export default NOTFOUND;
