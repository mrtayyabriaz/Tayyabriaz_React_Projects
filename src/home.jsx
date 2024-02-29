import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate();

  return (<>
    <h3>Tayyab Riaz Projects</h3>
    <button onClick={()=>{navigate("/weather")}}>Weather</button>
    <button style={{margin:"0px 5px"}} onClick={()=>{navigate("/gitsearch")}}>GitHub</button>
    <button style={{margin:"0px 5px"}} onClick={()=>{navigate("/movies")}}>Movies</button>
  </>
  )
}

export default Home
