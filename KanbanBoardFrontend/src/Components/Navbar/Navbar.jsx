import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        background: "rgb(200,250,255)",
        padding: '20px'
    }} >
      <NavLink to='/' >Home</NavLink>
      <NavLink to='/task/create' >Create-Task</NavLink>
      <NavLink to='/task/all'>My-Tasks</NavLink>
      <NavLink to='/user/login' >Login</NavLink>
    </div>
  )
}

export default Navbar
