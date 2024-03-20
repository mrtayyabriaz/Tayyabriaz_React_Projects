// import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '/logo.png';

const Nevbar = () => {
  return (<>
    <div className='Nevbar'>
      <div className="logo"><img className='logoimg' src={logo} /></div>
      <ul className='NevLinks'>
        <li><NavLink to={"/"} className={"nevlink"}>Home</NavLink></li>
        <li><NavLink to={"/weather"} className={"nevlink"}>Weather</NavLink></li>
        <li><NavLink to={"/gitsearch"} className={"nevlink"}>GitHub</NavLink></li>
        <li><NavLink to={"/movies"} className={"nevlink"}>Movies</NavLink></li>
        <li><a href='https://my-todo-place.netlify.app/' target='_blank' className={"nevlink"}>🔗My Todo Place</a></li>
        <li><a href='https://mrtayyabriaz.netlify.app/' target='_blank' className={"nevlink"}>🔗Mr Tayyab Riaz</a></li>
      </ul>
    </div>
  </>
  )
}

export default Nevbar
