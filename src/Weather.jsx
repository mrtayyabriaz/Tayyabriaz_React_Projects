import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from "axios";

export const Weather = () => {
  //---------- use State ------------
  const [search, setsearch] = useState("Pakistan");
  const [searchparams, setsearchparams] = useSearchParams();
  //---------- use State ------------

  const fetchweather = () => {
    return axios
      .get(`https://api.weatherapi.com/v1/current.json?q=` + search + `&days=1&key=a55eaa4b19d94cdc9c2153256231611&aqi=yes`)
      .then(res => res.data)
  }

  const queryClient = useQueryClient()

  const weatherQuery = useQuery({
    queryKey: ["weather",],
    queryFn: fetchweather,
    // save data in fresh state 
    staleTime: 1000 * 30,
    // fatch data in every 5 second
    // refetchInterval: 1000 * 5,
  })

  // const newQuery = useQuery({
  //   queryKey: ["new", weatherQuery?.data?.location.region],
  //   // only when weatherquery exist
  //   enabled: weatherQuery?.data?.location.region != null,
  //   queryFn: fetchweather,
  //   staleTime: 1000 * 30,
  //   refetchInterval: 1000 * 5,
  // })


  const weatherMutation = useMutation({
    // retry 3 times
    // retry:3,
    mutationFn: () => {
      queryClient.invalidateQueries({ queryKey: ['weather'] })
      // return true;
    },
    onsuccess: (data, variablespassed, context) => {
      console.log('"Refatched"');
      console.log(context);
    },
    onMutate: (variablespassed) => {
      // run before mutation function
      console.log('"Mutating"');
      // given to context in onsuccess 
      return { hi: 'by' };
    }
  })

  // console.log(weatherQuery.status);
  weatherQuery.error && console.log(weatherQuery.error);

  console.log('status', weatherQuery.status);
  console.log('fetchStatus', weatherQuery.fetchStatus);



  useEffect(() => {
    if (weatherQuery.status == 'success') {
      console.log(weatherQuery.data);
    }
    let country = searchparams.get("country")
    if (country) {
      setsearch(country);
    } else {
      setsearch("Pakistan");
      setsearchparams({ country: "Pakistan" });
    }
  }, [])

  function getweather() {
    setsearchparams({ country: search });
    weatherMutation.mutate();
  }

  return (
    <>
      <h1>Weather</h1>

      {weatherQuery.status ? weatherQuery.status : null}
      <form className='dflex' onSubmit={(e) => { e.preventDefault() }}>
        <input type="text" onChange={(e) => { setsearch(e.target.value); }} value={search} />
        <button className="searchbtn" disabled={weatherMutation.isLoading} onClick={() => { getweather() }}>Search</button>
      </form>


      <div className='last_update'>
        <span className="theattribute">Last Updated:</span>
        <span className='weather'>{weatherQuery.data?.current.last_updated}</span>
      </div>

      <div>Weather:
        <img className='weathericon' src={weatherQuery.data?.current.condition.icon} />
        <span className='weather'>{weatherQuery.data?.current.condition.text}</span>
      </div>
      <div>
        <span className="theattribute">Region:</span>
        <span className='weather'>{weatherQuery.data?.location.region}</span>
      </div>
      <br />
      <div>
        <span className="theattribute">Temperature Celcius:</span>
        <span className='weather'>{weatherQuery.data?.current.temp_c}</span>
      </div>
      <div>
        <span className="theattribute">Temperature Fahrenheit:</span>
        <span className='weather'>{weatherQuery.data?.current.temp_f}</span>
      </div>
    </>
  )
}

export default Weather