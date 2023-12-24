import React from "react";
import attach from '../images/attach.png';
import file from "../images/img.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something here..." />
      <div className="send">
        <img src={attach}/>
        <input type="file" style={{display: "none"}} />
        <label>
          <img src={file} />
        </label>
        <button>send</button>
      </div>
    </div>
  );
};

export default Input;
