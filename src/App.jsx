import './style/index.css'
import './style/App.min.css'
import Weather from './pages/Weather';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nevbar from './components/Nevbar';
import Home from './pages/home';
import GithubUserSearch from './pages/Github';
import MovieLand from './pages/MovieLand';

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
