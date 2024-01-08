import React, { useContext, useEffect, useState } from "react";
import cam from "../images/cam.png";
import add from "../images/add.png";
import more from "../images/more.png";
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setselectedUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const chatroomData = await data; // Wait for the promise to resolve
        setselectedUser(chatroomData.selectedUser);
        console.log("selected USEr Id", chatroomData.currentuser);
        const selectedUserRef = doc(db, "users", chatroomData.currentuser);
        console.log("REf=>", selectedUserRef);
        const selectedDoc = await getDoc(selectedUserRef);
        console.log("Details", selectedDoc);
        const selectedUserDetails = selectedDoc.data();
        setCurrentUser(selectedUserDetails);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data, selectedUser]);

  return (
      <>
        {loading ? (
            // Display a loading screen while data is being fetched
            <div className="chat">
              <div className="ChatBanner">


                <div style={{fontsize:"35px"}}>Loading...</div>
              </div>

            </div>
        ) : selectedUser ? (
            <div className="chat">
              <div
                  className="chatInfo"
                  style={{
                    backgroundColor: "#2C3E50",
                    padding: "10px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                      src={currentUser?.photoURL}
                      alt={currentUser?.displayname}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                  />
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {currentUser?.displayName}
              </span>
                </div>
                <div className="chatIcons" style={{ display: "flex", gap: "10px" }}>
                  <img src={cam} alt="" style={{ width: "30px", height: "30px" }} />
                  <img src={add} alt="" style={{ width: "30px", height: "30px" }} />
                  <img src={more} alt="" style={{ width: "30px", height: "30px" }} />
                </div>
              </div>

              <div>
                <Messages />
                <Input />
              </div>
            </div>
        ) : (
            <div className="chat">
              <div className="ChatBanner">
                <div className="selectText">Select a User</div>
              </div>
            </div>
        )}
      </>
  );
};

export default Chat;
