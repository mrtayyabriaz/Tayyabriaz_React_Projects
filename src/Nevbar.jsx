// import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from './assets/static/logo.png';

const Nevbar = () => {
  return (<>
    <div className='Nevbar'>
      <div className="logo"><img className='logoimg' src={logo}/></div>
      <ul className='NevLinks'>
        <li><NavLink to={"/"} className={"nevlink"}>Home</NavLink></li>
        <li><NavLink to={"/weather"} className={"nevlink"}>Weather</NavLink></li>
        <li><NavLink to={"/gitsearch"} className={"nevlink"}>Git Search</NavLink></li>
      </ul>
    </div><br /> <br /><br />
  </>
  )
}

export default Nevbar
