import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="user">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Roddur_Roy.png" alt="" />
        <span>You</span>
      </div>
      <div className="info">
        <span className='logo'>SB CHAT</span>
        <button>Log out</button>
      </div>
    </div>
  )
}

export default Navbar
