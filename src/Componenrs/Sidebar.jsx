import React from 'react'
import Navbar from '../Componenrs/Navbar';
import Search from '../Componenrs/Search';
import SideBarChats from './SideBarChats.jsx';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <SideBarChats />
    </div>
  )
}

export default Sidebar
