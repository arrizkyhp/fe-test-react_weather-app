import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Tanggal from '../components/Tanggal';
import Card from '../layout/Card';
import Navigation from '../layout/Navigation';
import { getWeatherData, setErrorGeolocation } from "../redux/actions/weatherAction"

const Home = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const { getWeatherResult, getWeatherLoading, getWeatherError, getErrorGeolocationMessage } = useSelector((state) => state.weatherReducer)
    const dispatch = useDispatch();

    const showPosition = (position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    }

    const showError = (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setError(true)
          setErrorMessage("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          setError(true)
          setErrorMessage("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          setError(true)
          setErrorMessage("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          setError(true)
          setErrorMessage("An unknown error occurred.")
          break;
        default:
          break
      }
    }

    // Get Current Location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    }

    useEffect(() => {
      getLocation();
    }, [])

    useEffect(() => {
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   setLatitude(position.coords.latitude)
      //   setLongitude(position.coords.longitude)
      // });

      if(error) {
        dispatch(setErrorGeolocation(errorMessage))
      }
  
     if (latitude != "") {
      dispatch(getWeatherData(latitude, longitude))
     }
    }, [dispatch, latitude, longitude, error, errorMessage])

    const meterToKm = (anginMeter) => {
      return (3.6 * anginMeter).toFixed(0)
    }
    
    // console.log(getWeatherResult)
    // console.log(getErrorGeolocationMessage)
   
  return (
    <>
      <Navigation today disabled={error ? true : false}/>
      <SearchBar placeholder="Search City..." />
     
      {/* <h1>Latitude: {latitude}</h1>
      <h1>Longitude: {longitude}</h1> */}
      {error ? <p className='text-center text-lg text-rose-500 mt-5'>{errorMessage}</p> : getWeatherResult ? 
        (
            <Card>
              <div className="flex justify-start md:justify-between flex-col md:flex-row px-6 md:px-0">
                <div className="flex flex-col">
                  <h2 className='font-semibold text-2xl'>{getWeatherResult.name}, <span className='text-2xl'>{getWeatherResult.sys.country}</span> </h2>
                </div>
                <div className="flex flex-col items-start md:items-end">
                  <Tanggal dataCalc={getWeatherResult.dt} timezone={getWeatherResult.timezone} />
                  <Tanggal waktu dataCalc={getWeatherResult.dt} timezone={getWeatherResult.timezone} />
                </div>
              </div>
              <div className="flex flex-col items-center mt-5 md:mt-0">
                <h1 className='font-bold text-8xl flex'>{getWeatherResult.main.temp.toFixed(0)}°<span className='text-6xl'>C</span></h1>
                <h2 className='font-medium text-4xl'>{getWeatherResult.weather[0].main}</h2>
                <h3 className='text-base'>{getWeatherResult.weather[0].description}</h3>
              </div>
              <div className="flex flex-col md:flex-row mt-8 gap-4 mb-8 px-6 md:px-0">
                <div className="flex flex-col bg-slate-300 p-4 rounded-lg items-center w-full">
                  <h1>Humidity</h1>
                  <p className='text-2xl font-semibold'>{getWeatherResult.main.humidity}%</p>
                </div>
                <div className="flex flex-col bg-slate-300 p-4 rounded-lg items-center w-full">
                  <h1>Wind</h1>
                  <p className='text-2xl font-semibold'>{meterToKm(getWeatherResult.wind.speed)} km/h</p>
                </div>
                <div className="flex flex-col bg-slate-300 p-4 rounded-lg items-center w-full">
                  <h1>Pressure</h1>
                  <p className='text-2xl font-semibold'>{getWeatherResult.main.pressure} hPa</p>
                </div>
              </div>
            <hr className='mb-5'/>
              <div className="flex justify-end px-6 md:px-0">
                <Link className='bg-emerald-600 px-6 py-4 rounded-full text-white font-semibold' to={{pathname: "/day", latitude: { latitude }}}>Next 6 Days Weather</Link>
              </div>
            </Card>
        
        )  : getWeatherLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{getWeatherError}</p>
      )}
    </>
  )
}

export default Home