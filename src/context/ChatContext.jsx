import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import {db} from "../firebase.js";
import {doc,getDoc,onSnapshot} from "firebase/firestore";
import * as path from "path";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {

    currentuser: "null",
    chatroom:"null",
    selectedUser:false,
  };

  const ChatroomFinder=async (currentUser,selectedUser)=>{
    const currentUserRef=doc(db,"users",currentUser);
    const currentDoc=await getDoc(currentUserRef);
    const chatrooms=currentDoc.data().chatroom;
    console.log("Snap=>",currentDoc.data());
    for(const chatroom of chatrooms ){
      const splitchat=chatroom.split('_');
      const id1=splitchat[0];
      const id2=splitchat[1];
      if(id1==selectedUser || id2==selectedUser){
        return chatroom;
      }
    }

  }
  const chatReducer = async (state, action) => {

    const chatroom=await ChatroomFinder(currentUser.uid,action.payload.uid);
    switch (action.type) {
      case "CHANGE_USER":
        return {
          currentuser: action.payload.uid,
          chatroom:chatroom,
          selectedUser:true,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
