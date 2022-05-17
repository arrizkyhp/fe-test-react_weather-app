import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Tanggal from '../components/Tanggal';
import Card from '../layout/Card';
import Navigation from '../layout/Navigation';
import { getWeatherData } from "../redux/actions/weatherAction"

const Home = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const { getWeatherResult, getWeatherLoading, getWeatherError } = useSelector((state) => state.weatherReducer)
    const dispatch = useDispatch();

    // console.log(getWeatherResult.main.temp)
  

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      });
  
     if (latitude != "") {
      dispatch(getWeatherData(latitude, longitude))
     }
    }, [dispatch, latitude, longitude])

    const meterToKm = (anginMeter) => {
      return (3.6 * anginMeter).toFixed(0)
    }
    
    // console.log(getWeatherResult)
   
  return (
    <>
      <Navigation today/>
      <input className='w-full px-4 h-10 rounded-lg' placeholder='Search City...'/>
      {/* <h1>Latitude: {latitude}</h1>
      <h1>Longitude: {longitude}</h1> */}
      {getWeatherResult ? 
        (
            <Card>
              <div className="flex justify-between">
                <h2 className='font-semibold text-2xl'>{getWeatherResult.name} </h2>
                <div className="flex flex-col items-end">
                  <Tanggal dataCalc={getWeatherResult.dt} timezone={getWeatherResult.timezone} />
                  <Tanggal waktu dataCalc={getWeatherResult.dt} timezone={getWeatherResult.timezone} />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h1 className='font-bold text-8xl flex'>{getWeatherResult.main.temp.toFixed(0)}°<span className='text-6xl'>C</span></h1>
                <h2 className='font-medium text-4xl'>{getWeatherResult.weather[0].main}</h2>
                <h3 className='text-base'>{getWeatherResult.weather[0].description}</h3>
              </div>
              <div className="flex mt-8 gap-4 mb-8">
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
              <div className="flex justify-end">
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