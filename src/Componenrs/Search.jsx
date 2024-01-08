import React, { useState, useContext, useEffect } from "react";
import {collection, getDocs, doc, getDoc, setDoc,updateDoc,arrayUnion} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext.jsx";


const Search = () => {
  const [username, setUsername] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [err, setErr] = useState(false);
  const [searching, setSearching] = useState(false);

  // Getting current user
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);

        const usersData = [];
        usersSnapshot.forEach((doc) => {
          usersData.push(doc.data());
        });

        setAllUsers(usersData);
      } catch (error) {
        console.error("Error fetching all users:", error);
        setErr(true);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (username.trim() === "") {
      // If username is empty, clear the filtered users
      setFilteredUsers([]);
      return;
    }

    // Filter users based on the username as it changes
    const filteredResults = allUsers.filter((user) =>
        user.displayName.toLowerCase().includes(username.toLowerCase())
    );

    setFilteredUsers(filteredResults);
  }, [username, allUsers]);

  const handleSelect = async (resultUser) => {
    let chatroomId;
    // Handle the selection logic here
    console.log("CurrentUser=>", currentUser.uid);
    console.log("ResultUser=>", resultUser.uid);

    if (currentUser.uid !== resultUser.uid) {
      console.log("Not same");
      alert("Congratulations you Guys are now Friends");
      chatroomId = currentUser.uid +"_"+ resultUser.uid;
      console.log("NEWID=>", chatroomId);

      try {
        const record = await getDoc(doc(db, "ChatRoom", chatroomId));
        console.log("Record Found",record);

        if (!record.exists()) {
          // Document doesn't exist, create a new one
          const response = await setDoc(doc(db, "ChatRoom", chatroomId), {
            user1: currentUser.uid,
            user2: resultUser.uid,
            createdAt: Date.now(),
            messages: [],
          });
          const cuser=doc(db,"users",currentUser.uid);
          const ruser=doc(db,"users",resultUser.uid);
          await updateDoc(cuser,{
            friends:arrayUnion(resultUser.uid),
            chatroom:arrayUnion(chatroomId)
          });
          await updateDoc(ruser,{
            friends:arrayUnion(currentUser.uid),
            chatroom:arrayUnion(chatroomId)
          });

          console.log("Response=>",response);

        } else {
          // Document already exists, handle accordingly
          console.log("Document already exists:", record.data());
          alert("Found Your chat and fetching your chat");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ids are the same");
      alert("Sorry, You cannot select yourself");
    }
  };


  return (
      <div className="search">
        <div className="searchForm">
          <input
              type="text"
              placeholder="search"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
          />
          {err && <span>Something went wrong!</span>}
        </div>
        {searching && <span>Searching...</span>}
        {filteredUsers.map((resultUser) => (
            <div className="userChat" key={resultUser.uid} onClick={() => handleSelect(resultUser)}>
              <img src={resultUser.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{resultUser.displayName}</span>
              </div>
            </div>
        ))}
      </div>
  );
};

export default Search;
