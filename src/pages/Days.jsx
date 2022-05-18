import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tanggal from '../components/Tanggal';
import Card from '../layout/Card';
import Navigation from '../layout/Navigation';
import { getWeatherFiveDayData } from '../redux/actions/weatherAction';

const Days = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const { 
      getWeatherFiveDayResult, 
      getWeatherFiveDayLoading, 
      getWeatherFiveDayError, 
      getWeatherLatitude,
      getWeatherLongitude,
      getErrorGeolocationMessage
    } = useSelector((state) => state.weatherReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        // getLocation();
        if (!getWeatherLatitude ) {
            navigator.geolocation.getCurrentPosition(function(position) {
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
            });
        } else {
            setLatitude(getWeatherLatitude)
            setLongitude(getWeatherLongitude)
        }
       
    
        if (latitude != "") {
            dispatch(getWeatherFiveDayData(latitude, longitude))
        } else if (latitude === false ) {
            setError(true)
            if(getErrorGeolocationMessage == "") {
                setErrorMessage("No Location")
            } else {
                setErrorMessage(getErrorGeolocationMessage)
            }
        }
      }, [dispatch, latitude, longitude, getWeatherLatitude, getWeatherLongitude,getErrorGeolocationMessage])

      const meterToKm = (anginMeter) => {
        return (3.6 * anginMeter).toFixed(0)
      }

      // console.log(getWeatherFiveDayResult)
      // console.log(getWeatherLatitude)
      // console.log(getWeatherLongitude)
      // console.log(getErrorGeolocationMessage)
  return (
    <>
        <Navigation day />
        {error ? <p className='text-center text-lg text-rose-500 mt-5'>{errorMessage}</p> : getWeatherFiveDayResult ? 
        (
            <Card>
                <div className="px-4 md:px-0">
                    <h1 className='text-2xl font-bold'>6 Day Weather</h1>
                    <h2 className='text-xl font-medium'>{getWeatherFiveDayResult.city.name}</h2>
                </div>
                <div className="mt-6">
                    {getWeatherFiveDayResult.list.map((item, index) => (
                        <div className='border-y py-2 grid grid-cols-[1fr_1fr_2fr] md:grid-cols-4 grid-rows-2 md:grid-rows-1 px-4 md:px-0 gap-y-1  justify-center items-center' key={index}>
                            <div className="col-[1/-1] md:col-auto flex md:flex-col justify-between items-center md:items-start">
                                <Tanggal dataCalc={item.dt} timezone={getWeatherFiveDayResult.city.timezone} />
                                <Tanggal waktu dataCalc={item.dt} timezone={getWeatherFiveDayResult.city.timezone} />
                            </div>
                            <div className="text-center text-xl md:text-lg font-semibold">{item.main.temp.toFixed(0)}°C</div>
                            <div className="text-center">{item.weather[0].main}</div>
                            <div className="flex gap-5 justify-end md:pr-4">
                                <div className="flex flex-col items-center">
                                    <p>Humidity</p>
                                    <p>{item.main.humidity}%</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p>Wind</p>
                                    <p>{meterToKm(item.wind.speed)} km/h</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        
        )  : getWeatherFiveDayLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{getWeatherFiveDayError}</p>
      )}
     
    </>
  )
}

export default Days