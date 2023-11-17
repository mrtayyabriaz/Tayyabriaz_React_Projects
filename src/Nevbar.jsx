// import React from 'react'
import { NavLink } from 'react-router-dom'

const Nevbar = () => {
  return (
    <div>
      <ul className='NevBar'>
        <li><NavLink to={"/"} className={"nevlink"}>Home</NavLink></li>
        <li><NavLink to={"/weather"} className={"nevlink"}>Weather</NavLink></li>
        <li><NavLink to={"/gitsearch"} className={"nevlink"}>Git Search</NavLink></li>
      </ul>
    </div>
  )
}

export default Nevbar
