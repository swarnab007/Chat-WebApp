import React from "react";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Roddur_Roy.png" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Roddur_Roy.png" alt="" /> */}
      </div>
    </div>
  );
};

export default Message;
