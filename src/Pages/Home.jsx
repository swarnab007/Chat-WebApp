import React from 'react'
import Chat from '../Componenrs/Chat';
import Sidebar from '../Componenrs/Sidebar';

const Home = () => {
  return (
    <div className='home'>
      <div className="Container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home
