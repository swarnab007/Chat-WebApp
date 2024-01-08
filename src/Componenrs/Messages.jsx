import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import {onSnapshot, collection, doc, getDoc} from "firebase/firestore";
import Message from "./Message.jsx";


const Messages = ({ chatroom,selectedUser}) => {
    const [messages, setMessages] = useState([]);
    console.log("Inside message component chatrromID=>",chatroom);

    useEffect(() => {
        if (selectedUser && chatroom) {  // Check if chatroom is defined
            const chatroomRef = doc(db, "ChatRoom", chatroom);

            const unsubscribe = onSnapshot(chatroomRef, (snapshot) => {
                const chatroomData = snapshot.data();
                const messagesData = chatroomData?.messages || [];
                setMessages(messagesData);
                console.log(messages);
            });

            return () => {
                unsubscribe();
            };
        }
    }, [chatroom, selectedUser]);


    return (
        <>
            {selectedUser && (
                <div className="messages">
                    {messages.length === 0 ? (
                        <p>No messages yet. Start the conversation!</p>
                    ) : (
                        messages.map((message) => (
                            <Message key={message.id} message={message} />
                        ))
                    )}
                </div>
            )}
        </>
    );
};

export default Messages;
