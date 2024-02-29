import { useState } from 'react'
import './assets/style/App.min.css'
import Weather from './Weather';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nevbar from './Nevbar';
import Home from './home';
import GithubUserSearch from './Github';
import MovieLand from './MovieLand';

function App() {
  //---------- use State ------------
  const [weathericon, setweathericon] = useState();
  const [weather, setweather] = useState();
  const [region, setregion] = useState();
  const [temp_c, settemp_c] = useState();
  const [temp_f, settemp_f] = useState();
  const [last_updated, setlast_updated] = useState();
  //---------- use State ------------
  // const [searchpar,setsearchpar] = useSearchParams();
  
  
  const GetWeatherJson = (search) => {

    // -------- fatch json ---------
    let parameters = `q=` + search + `&days=1&key=a55eaa4b19d94cdc9c2153256231611&aqi=yes`
    fetch(`https://api.weatherapi.com/v1/current.json?${parameters}`)
      .then((res) => {
        res.json().then((result) => {
          // -------- fatch json ---------

          //------- search params -----------
          // setsearchparams({country:search})
          // setsearchpar({age:30,city:"ci"})
          // console.log(searchpar);
          //------- search params -----------

          //----------- result -----------
          console.log(result);
          setweather(result.current.condition.text);
          setweathericon(result.current.condition.icon);
          setlast_updated(result.current.last_updated);
          settemp_c(result.current.temp_c)
          settemp_f(result.current.temp_f)
          setregion(result.location.region);
          //----------- result -----------

        })
      }).catch((err) => { setweather(err) })
  }
  return (
    <>
      <BrowserRouter>
    <Nevbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/weather' element={<Weather last_updated={last_updated} temp_c={temp_c} temp_f={temp_f} region={region} weathericon={weathericon} weather={weather} GetWeatherJson={GetWeatherJson} />} />
          <Route path='/gitsearch' element={<GithubUserSearch />}/>
          <Route path='/movies' element={<MovieLand />}/>
          <Route path='*' element={<h1>404 Page Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
