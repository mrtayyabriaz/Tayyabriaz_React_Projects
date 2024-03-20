import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from "axios";

export const Weather = () => {
  const [searchparams, setsearchparams] = useSearchParams();
  //---------- use State ------------
  const [search, setsearch] = useState("Pakistan");
  const [tempC, setTempC] = useState(true);
  //---------- use State ------------

  const fetchCurrentweather = () => {
    return axios
      .get(`https://api.weatherapi.com/v1/forecast.json?q=` + search + `&days=5&key=a55eaa4b19d94cdc9c2153256231611&aqi=yes`)
      .then(res => res.data)
  }


  const queryClient = useQueryClient()

  const weatherQuery = useQuery({
    queryKey: ["weather",],
    queryFn: fetchCurrentweather,
    // save data in fresh state 
    staleTime: 1000 * 60 * 20,
    // fatch data in every 5 second
    // refetchInterval: 1000 * 5,
  })

  // const newQuery = useQuery({
  //   queryKey: ["new", weatherQuery?.data?.location.region],
  //   // only when weatherquery exist
  //   enabled: weatherQuery?.data?.location.region != null,
  //   queryFn: fetchCurrentweather,
  //   staleTime: 1000 * 30,
  //   refetchInterval: 1000 * 5,
  // })


  const weatherMutation = useMutation({
    //// 3 times retry 
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
    let country = searchparams.get("country")
    if (country) {
      setsearch(country);
    } else {
      setsearch("Pakistan");
      setsearchparams({ country: "Pakistan" });
    }
  }, [])
  useEffect(() => {
    if (weatherQuery.status == 'success') {
      console.log(weatherQuery.data);
    }
  }, [weatherQuery])

  function getweather() {
    setsearchparams({ country: search });
    weatherMutation.mutate();
  }

  return (
    <>
      <div className="mt-16">
        <div className="flex flex-col items-center ">

          <h1>Weather</h1>

          {/* {weatherQuery.status ? weatherQuery.status : null} */}

          <form className='flex' onSubmit={(e) => { e.preventDefault() }}>
            <input
              className="bg-zinc-900 border-zinc-600"
              type="text" onChange={(e) => { setsearch(e.target.value); }} value={search} />
            <button className="bg-zinc-800 border-zinc-600 rounded-e-md rounded-s-none" disabled={weatherMutation.isLoading} onClick={() => { getweather() }}>Search</button>
          </form>

          <div className="text-start w-full pl-6 mt-4">
            <span className="text-sm mt-1 text-zinc-400">Results for: </span>
            <span className='text-zinc-100'>{weatherQuery.data?.location.region}</span>
          </div>

          {/* Showing weather (start) */}
          <div className="w-full px-4 font-sans">
            <div className="mt-2 mb-4 flex items-center justify-between">
              <div className="flex">
                <div className="flex flex-row items-center justify-start">
                  <div>
                    <img className='w-20' src={weatherQuery.data?.current.condition.icon} />
                  </div>
                  <div className='text-[3.3rem] font-bold'>{tempC ? Math.floor(weatherQuery?.data?.current?.temp_c) : Math.floor(weatherQuery.data?.current.temp_f)}</div>
                  <div className="ml-0 h-10">
                    <div className="flex">
                      <div
                        onClick={() => { setTempC(true) }}
                        className={tempC ? "before:border-zinc-100 text-zinc-100 pl-2 ml-2 font-bold relative before:absolute before:top-1.5 before:left-0 before:w-1.5 before:h-1.5 before:rounded-full before:border-solid before:border-2 cursor-default" : " before:border-zinc-400 text-zinc-400 pl-2 ml-2 font-bold relative before:absolute before:top-1.5 before:left-0 before:w-1.5 before:h-1.5 before:rounded-full before:border-solid before:border-2 cursor-pointer"}>C</div>
                      <div className="border ml-2 w-0 border-solid border-zinc-400 h-6 px-0"></div>
                      <div
                        onClick={() => { setTempC(false) }}
                        className={tempC ? "before:border-zinc-400 text-zinc-400 pl-2 ml-2 relative font-bold before:absolute before:top-1.5 before:left-0 before:w-1.5 before:h-1.5 before:rounded-full before:border-2 cursor-pointer" : "before:border-zinc-100 text-zinc-100 pl-2 ml-2 relative font-bold before:absolute before:top-1.5 before:left-0 before:w-1.5 before:h-1.5 before:rounded-full before:border-2 cursor-default"}>F</div>
                    </div>
                  </div>
                </div>
                <div className="text-zinc-400 flex flex-col justify-end items-start ml-4">
                  <div className="text-sm">Precipitation: {Math.floor(weatherQuery.data?.current.precip_in)}%</div>
                  <div className="text-sm">Humidity:  {Math.floor(weatherQuery.data?.current.humidity)}%</div>
                  <div className="text-sm">Wind:  {Math.floor(weatherQuery.data?.current.wind_kph)} km/h</div>
                </div>
              </div>
              <div className="flex flex-col items-end mt-auto">
                <div className="text-lg">Weather</div>
                <div className="text-sm text-zinc-400">{weatherQuery.data?.current.last_updated}</div>
                <div className="text-sm text-zinc-400">{weatherQuery.data?.current.condition.text}</div>
              </div>
            </div>

          </div>
          {/* Showing weather (start) */}
        </div>
      </div>
    </>
  )
}

export default Weather