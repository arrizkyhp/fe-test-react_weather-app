import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const { getWeatherResult } = useSelector((state) => state.weatherReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWeatherResult())
    }, [dispatch])

    console.log(getWeatherResult)

  return (
    <div>Home</div>
  )
}

export default Home