import axios from "axios";

export const GET_WEATHER_DATA = "GET_WEATHER_DATA";
export const GET_WEATHER_FIVEDAY_DATA = "GET_WEATHER_FIVEDAY_DATA";
export const SET_ERROR_GEOLOCATION = "SET_ERROR_GEOLOCATION";
export const FILTER_WEATHER_DATA = "FILTER_WEATHER_DATA";
;

export const getWeatherData = (lat, lon) => {
    return (dispatch) => {
        // Loading
 
        dispatch({
            type: GET_WEATHER_DATA,
            payload: {
                loading: true,
                data: false,
                latitude: false,
                longitude: false,
                errorMessage: false
            }
        })
        axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4ef1015ed54148de3fa41ecc6c6dadad`,
            timeout: 120000,
        })
        .then((response) => {
            dispatch({
                type: GET_WEATHER_DATA,
                payload: {
                    loading: false,
                    data: response.data,
                    latitude: lat,
                    longitude: lon,
                    errorMessage: false
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_WEATHER_DATA,
                payload: {
                    loading: false,
                    data: false,
                    latitude: false,
                    longitude: false,
                    errorMessage: error.message
                }
            })
        })
    }
}

export const getWeatherFiveDayData = (lat, lon) => {
    return (dispatch) => {
        // Loading
   
        dispatch({
            type: GET_WEATHER_FIVEDAY_DATA,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=4ef1015ed54148de3fa41ecc6c6dadad`,
            timeout: 120000,
        })
        .then((response) => {
            dispatch({
                type: GET_WEATHER_FIVEDAY_DATA,
                payload: {
                    loading: false,
                    data: response.data,
                    errorMessage: false
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_WEATHER_FIVEDAY_DATA,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
        })
    }
}

export const setErrorGeolocation = (errorMessage) => {
    return (dispatch) => {
        dispatch({
            type: SET_ERROR_GEOLOCATION,
            payload: {
                errorMessage: false
            }
        })

        if(errorMessage != false) {
            dispatch({
                type: SET_ERROR_GEOLOCATION,
                payload: {
                    errorMessage: errorMessage
                }
            })
        }
    }
}

export const filterWeatherData = (city) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_WEATHER_DATA,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ef1015ed54148de3fa41ecc6c6dadad`,
            timeout: 120000,
        })
        .then((response) => {
            dispatch({
                type: FILTER_WEATHER_DATA,
                payload: {
                    loading: false,
                    data: response.data,
                    errorMessage: false
                }
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_WEATHER_FIVEDAY_DATA,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
        })
    }
}

