import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate();

  return (<>
    <h3>Tayyab Riaz Projects</h3>
    <button onClick={()=>{navigate("/weather")}}>Weather</button>
  </>
  )
}

export default Home
