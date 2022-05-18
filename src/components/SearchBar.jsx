import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { filterWeatherData, getWeatherData } from '../redux/actions/weatherAction';

const SearchBar = ({ placeholder, data }) => {
    const [filteredData, setFilteredData] = useState("")
    const [dataWeather, setDataWeather] = useState({})
    const [itemFilter, setItemFilter] = useState(false)
    
    const { getFilteredWeatherResult } = useSelector((state) => state.weatherReducer)
    const dispatch = useDispatch();

    const handleFilter = (event) => {
        setFilteredData(event.target.value);
        // console.log(filteredData)
        setItemFilter(true)
    }

    const handleClick = () => {
        setDataWeather(getFilteredWeatherResult);
        dispatch(getWeatherData(getFilteredWeatherResult.coord.lat, getFilteredWeatherResult.coord.lon))
        console.log(dataWeather)
        setItemFilter(false)
    }

    useEffect(() => {
        if(filteredData !== "") {
            dispatch(filterWeatherData(filteredData))
        }

    }, [dispatch, filteredData])

    // console.log(getFilteredWeatherResult)

  return (
    <div className='relative'>
        <div className="relative">
            <input className='w-full px-4 h-10 rounded-lg' placeholder={placeholder} onChange={handleFilter}/>
            <FaSearch className='absolute right-4 top-3 text-slate-400' />
        </div>
        <div className={`${filteredData === "" || !itemFilter ? "hidden" : "flex"} absolute w-full border border-slate-400 shadow-xl flex-col bg-white`}>
            {getFilteredWeatherResult ? (
                <button className='px-4 py-5 text-left' onClick={handleClick}>{getFilteredWeatherResult.name}, {getFilteredWeatherResult.sys.country}</button>
            ): <p>Not Found</p>}
        </div>
    </div>
    
  )
}

export default SearchBar