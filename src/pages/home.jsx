import { Calculator, CloudLightning, GithubIcon, HomeIcon, PcCase } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate();


  const navigation = [
    { name: 'Home', href: '/', icon: <HomeIcon /> },
    { name: 'Calculator', href: '/calculator', icon: <Calculator /> },
    { name: 'Weather', href: '/weather', icon: <CloudLightning /> },
    { name: 'GitHub', href: '/gitsearch', icon: <GithubIcon /> },
    { name: 'Movies', href: '/movies', icon: <PcCase /> },
  ]
  return (
    <>
      <div className="container mt-20">
        <div className="flex flex-col items-center gap-4">
          <h3>Tayyab Riaz Projects</h3>
          <div>
            {navigation.map((item) => (
              <button key={item.name}
                className='text-white mx-2'
                onClick={() => { navigate(item.href) }}>
                <div className="flex gap-1 items-center">
                  {item.icon}
                  {item.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
