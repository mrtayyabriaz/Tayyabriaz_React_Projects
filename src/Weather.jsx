import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";

export const Weather= (props) =>{

//---------- use State ------------
const [search, setsearch] = useState("Pakistan");
const [searchparams, setsearchparams]= useSearchParams();
//---------- use State ------------


useEffect(() => {
  let country = searchparams.get("country")
  if(country){
    props.GetWeatherJson(country);
    setsearch(country);
  }else{
    props.GetWeatherJson("Pakistan");
    setsearchparams({country:"Pakistan"});
  }
  }, [])

function getweather(){
  props.GetWeatherJson(search);
  setsearchparams({country:search});
}

return(
    <>
     <h2>Weather</h2>
        <form className='dflex' onSubmit={(e) => { e.preventDefault() }}>
          <input type="text" onChange={(e) => { setsearch(e.target.value); }} value={search} />
          <button className="searchbtn" onClick={() => {getweather()}}>Search</button>
        </form>
      

      <div className='last_update'>
        <span className="theattribute">Last Updated:</span>
        <span className='weather'>{props.last_updated}</span>
      </div>

      <div>Weather:
        <img className='weathericon' src={props.weathericon} />
        <span className='weather'>{props.weather}</span>
      </div>
      <div>
        <span className="theattribute">Region:</span>
        <span className='weather'>{props.region}</span>
      </div>
      <br />
      <div>
        <span className="theattribute">Temperature Celcius:</span>
        <span className='weather'>{props.temp_c}</span>
      </div>
      <div>
        <span className="theattribute">Temperature Farnhite:</span>
        <span className='weather'>{props.temp_f}</span>
      </div>
    </>
)
}

export default Weather