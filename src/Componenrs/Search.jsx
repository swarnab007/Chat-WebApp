import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Getting current user
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    // generating an search query
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // if there is user
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  // if user presses enter then go to handleSearch()
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // if there is any chatscollection in firebase , if not then create
    // we will generate a combinedId for each chats collection
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    // if not
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    // deleting the username
    setUser(null);
    // deleting the input text
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="search"
          onKeyDown={handleKey}
          // setting the Username
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {err && <span>Something went wrong !</span>}
      </div>
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
