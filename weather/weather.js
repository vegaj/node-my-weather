const axios = require('axios')

const apiKey = require('../db/darksky.json').apiKey

const excludeArg = `minutely,hourly,daily,alerts,flags`


const formatURL = (lat, lon) => {
    return encodeURI(`https://api.darksky.net/forecast/${apiKey}/${lat},${lon}?exclude=${excludeArg}`)
}

const getWeather = async(lat, lon) => {

    let resp = await axios.get(formatURL(lat, lon))

    const status = resp.status

    if (status !== 200) {
        throw new Error(resp.data.code)
    }

    const current = resp.data.currently

    return {
        //Farenheit
        temp: current.temperature,
        //Farenheit
        apparent: current.apparentTemperature,
        //0 to 1
        humidity: current.humidity,
        //0 to 1
        cloudCover: current.cloudCover,
        //Human readable
        summary: current.summary,
    }
}

module.exports = {
    getWeather
}