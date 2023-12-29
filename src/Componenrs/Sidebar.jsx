import React from 'react'
import Navbar from '../Componenrs/Navbar';
import Search from '../Componenrs/Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar
