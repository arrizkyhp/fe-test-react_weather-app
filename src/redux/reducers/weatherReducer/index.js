import {
    GET_WEATHER_DATA
} from "../../actions/weatherAction"

const initialState = {
    getWeatherResult: false,
    getWeatherLoading: false,
    getWeatherError: false,
}

const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_WEATHER_DATA:
            return {
                ...state,
                getWeatherResult: action.payload.data,
                getWeatherLoading: action.payload.loading,
                getWeatherError: action.payload.errorMessage
            }
            default: 
            return state
    }
}

export default weatherReducer