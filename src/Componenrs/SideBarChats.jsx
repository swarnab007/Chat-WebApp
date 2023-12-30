import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import {doc, getDoc,getDocs, onSnapshot,writeBatch} from "firebase/firestore";

const SideBarChats = () => {
  // Fetch realtime updates from fireStore
  const [chats, setChats] = useState([]);
  const[friendData,setFriendData]=useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);


  useEffect(() => {
    const getChats = async () => {
      console.log("USEr",currentUser);
      const userRef=doc(db,"users",currentUser.uid);
      const docsnap=await getDoc(userRef,{fieldMask:["friends"]});
      const friends=docsnap.data().friends;

      // Create an array to store friend details
      const friendDetails = [];

      // Fetch details for each friend
      for (const friendUid of friends) {
        const friendRef = doc(db, "users", friendUid);
        const friendDoc = await getDoc(friendRef);
        console.log("DATA=>",friendDoc.data());

        if (friendDoc.exists()) {
          // Add friend details to the array
          friendDetails.push({
            uid: friendUid,
            displayName: friendDoc.data().displayName,
            photoURL:friendDoc.data().photoURL
            // Add other details as needed
          });
          setFriendData(friendDetails);
        } else {
          console.log(`User with UID ${friendUid} not found.`);
        }
      }

      // Now friendDetails array contains details for each friend
      console.log("Friend Details:", friendDetails);

      const unsub = onSnapshot(doc(db, "ChatRoom", currentUser.uid), (doc) => {
        setChats(doc.data());
        console.log("chats",chats);
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();

  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
      <div className="chats">
        {friendData &&
            friendData.map((friend) => (
                <div
                    className="userChatSidebar"
                    key={friend.uid}
                    onClick={() => handleSelect(friend)}
                >
                  <img src={friend.photoURL} alt=""/>
                  <div className="userChatInfo">
                    <span>{friend.displayName}</span>
                    {/* You might want to render some information from the chats array here */}
                    {/* Example: <p>{chats[friend.uid]?.lastMessage?.text}</p> */}
                  </div>
                </div>
            ))}
      </div>

  );
};

export default SideBarChats;
