import React, { useContext, useEffect, useState } from "react";
import cam from "../images/cam.png";
import add from "../images/add.png";
import more from "../images/more.png";
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase.js";
import {arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import attach from "../images/attach.png";
import file from "../images/img.png";
import { AuthContext } from "../context/AuthContext";


const Chat = () => {
  const [currentSelectedUser, setcurrentSelectedUser] = useState(null);
  const[chatRoomId,setchatRoomId]=useState("")
  const [selectedUser, setselectedUser] = useState(false);
  const [inputText,setInputText]=useState("");
  const [loading, setLoading] = useState(false);
  const { data } = useContext(ChatContext);
  const {currentUser}=useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const chatroomData = await data; // Wait for the promise to resolve
        console.log(chatroomData);
        setselectedUser(chatroomData.selectedUser);
        setchatRoomId(chatroomData.chatroom);
        console.log("selected USEr Id", chatroomData.currentuser);
        console.log("SelectedUSer Details=>",chatroomData);
        const selectedUserRef = doc(db, "users", chatroomData.currentuser);
        console.log("REf=>", selectedUserRef);
        const selectedDoc = await getDoc(selectedUserRef);
        console.log("Details", selectedDoc.data());
        const selectedUserDetails = selectedDoc.data();
        setcurrentSelectedUser(selectedUserDetails);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data, selectedUser]);


  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log(inputText);
    console.log(currentUser.uid);
    e.preventDefault();

    // Check if inputText has a value
    if (!inputText) {
      console.error("Input text is undefined or empty");
      return;
    }

    // Assuming inputText contains the message text
    const newMessage = {
      text: inputText || "",
      sender: currentUser.uid,
      reciver:currentSelectedUser.uid// Assuming this is the sender's user ID

    };

    try {
      // Update the document in the "ChatRoom" collection
      console.log(currentSelectedUser);
      const chatroomref=doc(db,"ChatRoom",chatRoomId);
      console.log("ChatRoom Ref=>",chatroomref);
      await updateDoc(chatroomref, {
        messages: arrayUnion(newMessage),
      });

      console.log("Message added successfully!");
      setInputText("");
    } catch (error) {
      console.error("Error adding message:", error);
    }

    // Handle other logic as needed
  };

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
                      src={currentSelectedUser?.photoURL}
                      alt={currentSelectedUser?.displayname}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                  />
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {currentSelectedUser?.displayName}
              </span>
                </div>
                <div className="chatIcons" style={{ display: "flex", gap: "10px" }}>
                  <img src={cam} alt="" style={{ width: "30px", height: "30px" }} />
                  <img src={add} alt="" style={{ width: "30px", height: "30px" }} />
                  <img src={more} alt="" style={{ width: "30px", height: "30px" }} />
                </div>
              </div>

              <div>
                <Messages chatroom={chatRoomId} selectedUser={selectedUser}/>
                <form onSubmit={handleSubmit}>
                  <div className="input">
                    <input
                        type="text"
                        placeholder="Type something here..."
                        value={inputText}
                        onChange={handleChange}
                    />
                    <div className="send">
                      {/* Your other elements */}
                      <button type="submit">Send</button>
                    </div>
                  </div>
                </form>

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
