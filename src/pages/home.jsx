import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="container mt-20">
        <div className="flex flex-col items-center gap-4">
          <h3>Tayyab Riaz Projects</h3>
          <div>

            <button
              className='text-white'
              onClick={() => { navigate("/weather") }}>Weather</button>
            <button style={{ margin: "0px 5px" }} onClick={() => { navigate("/gitsearch") }}>GitHub</button>
            <button style={{ margin: "0px 5px" }} onClick={() => { navigate("/movies") }}>Movies</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
