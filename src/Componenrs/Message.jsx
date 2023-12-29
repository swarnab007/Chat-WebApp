import React, { useState } from "react";

const Message = () => {
    const [selected, setSelected] = useState(false);

    return (
        <>
            {selected ? (
                <div className="message owner">
                    <div className="messageInfo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Roddur_Roy.png" alt="" />
                        <span>just now</span>
                    </div>
                    <div className="messageContent">
                        <p>hello</p>
                        {/* Additional content, such as images, can be added here */}
                    </div>
                </div>
            ) : (
                <div>Hello</div>
            )}
        </>
    );
};

export default Message;
