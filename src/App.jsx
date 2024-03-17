import './assets/style/App.min.css'
import Weather from './Weather';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nevbar from './Nevbar';
import Home from './home';
import GithubUserSearch from './Github';
import MovieLand from './MovieLand';

function App() {

  // const [searchpar,setsearchpar] = useSearchParams();


  return (
    <>
      <BrowserRouter>
        <Nevbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='/gitsearch' element={<GithubUserSearch />} />
          <Route path='/movies' element={<MovieLand />} />
          <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
