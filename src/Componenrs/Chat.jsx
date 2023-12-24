import React from 'react'
import cam from '../images/cam.png';
import add from "../images/add.png";
import more from "../images/more.png";
import Input from './Input';
import Messages from './Messages';

const Chatbox = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Rohan</span>
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
    </div>
  )
}

export default Chatbox
