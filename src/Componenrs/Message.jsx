import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

const Message = ({message}) => {
    const [selected, setSelected] = useState(false);
    const { currentUser } = useContext(AuthContext);
    console.log("Current USEr Inside MEssage component",currentUser.uid);

    return (
        <>
            {selected ? (
                <div className="message owner">
                    <div className="messageInfo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Roddur_Roy.png" alt="" />
                        <span>just now</span>
                    </div>
                    <div className="messageContent">
                        <p>{message}</p>
                        {/* Additional content, such as images, can be added here */}
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        width: "100%",


                        margin: "2px",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            fontSize: "25px",
                            ...(message.sender===currentUser.uid ? {marginLeft: "auto"} : {marginRight: "auto"}),
                            padding:"10px",
                            borderRadius:"5px",
                            ...(message.sender===currentUser.uid ? {backgroundColor: "red"} : {backgroundColor: "#8da4f1"}),

                        }}
                    >
                        {message.text}
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
