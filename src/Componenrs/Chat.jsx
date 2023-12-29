import React, {useContext, useState} from "react";
import cam from "../images/cam.png";
import add from "../images/add.png";
import more from "../images/more.png";
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [selectedUser,setSelectedUser]=useState(false);

  return (
    <>
        {selectedUser ? (<div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={cam} alt="" />
                    <img src={add} alt="" />
                    <img src={more} alt="" />
                </div>
            </div>
            <div>
                <Messages />
                <Input />
            </div>
        </div>):(<div className="chat">
            <div className="ChatBanner">
              <div className="selectText">Select a User</div>
            </div>
        </div>)}
    </>
  );
};

export default Chat;
