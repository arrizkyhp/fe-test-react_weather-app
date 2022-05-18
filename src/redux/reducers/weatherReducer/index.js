import {
    GET_WEATHER_DATA,
    GET_WEATHER_FIVEDAY_DATA
} from "../../actions/weatherAction"

const initialState = {
    getWeatherResult: false,
    getWeatherLatitude: false,
    getWeatherLongitude: false,
    getWeatherLoading: false,
    getWeatherError: false,

    getWeatherFiveDayResult: false,
    getWeatherFiveDayLoading: false,
    getWeatherFiveDayError: false,
}

const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_WEATHER_DATA:
            return {
                ...state,
                getWeatherResult: action.payload.data,
                getWeatherLatitude: action.payload.latitude,
                getWeatherLongitude: action.payload.longitude,
                getWeatherLoading: action.payload.loading,
                getWeatherError: action.payload.errorMessage
            }
        case GET_WEATHER_FIVEDAY_DATA:
            return {
                ...state,
                getWeatherFiveDayResult: action.payload.data,
                getWeatherFiveDayLoading: action.payload.loading,
                getWeatherFiveDayError: action.payload.errorMessage
            }
            default: 
            return state
    }
}

export default weatherReducer