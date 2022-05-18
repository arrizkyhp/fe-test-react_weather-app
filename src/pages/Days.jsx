import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tanggal from '../components/Tanggal';
import Card from '../layout/Card';
import Navigation from '../layout/Navigation';
import { getWeatherFiveDayData } from '../redux/actions/weatherAction';

const Days = (props) => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const { 
      getWeatherFiveDayResult, 
      getWeatherFiveDayLoading, 
      getWeatherFiveDayError, 
      getWeatherLatitude,
      getWeatherLongitude
    } = useSelector((state) => state.weatherReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        // getLocation();
        setLatitude(getWeatherLatitude)
        setLongitude(getWeatherLongitude)
    
        if (latitude != "") {
            dispatch(getWeatherFiveDayData(latitude, longitude))
        }
      }, [dispatch, latitude, longitude])

      const meterToKm = (anginMeter) => {
        return (3.6 * anginMeter).toFixed(0)
      }

      // console.log(getWeatherFiveDayResult)
      // console.log(getWeatherLatitude)
      // console.log(getWeatherLongitude)
  return (
    <>
        <Navigation day />
        {error ? <p className='text-center text-lg text-rose-500 mt-5'>{errorMessage}</p> : getWeatherFiveDayResult ? 
        (
            <Card>
                <h1 className='text-2xl font-bold'>6 Day Weather</h1>
                <h2 className='text-xl font-medium'>{getWeatherFiveDayResult.city.name}</h2>
                <div className="mt-6">
                    {getWeatherFiveDayResult.list.map((item, index) => (
                        <div className='border-y py-2 grid grid-cols-4 justify-center items-center' key={index}>
                            <div className="">
                                <Tanggal dataCalc={item.dt} timezone={getWeatherFiveDayResult.city.timezone} />
                                <Tanggal waktu dataCalc={item.dt} timezone={getWeatherFiveDayResult.city.timezone} />
                            </div>
                            <div className="text-center text-lg font-semibold">{item.main.temp.toFixed(0)}°C</div>
                            <div className="text-center">{item.weather[0].main}</div>
                            <div className="flex gap-5 justify-end pr-4">
                                <div className="">
                                    <p>Humidity</p>
                                    <p>{item.main.humidity}%</p>
                                </div>
                                <div className="">
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