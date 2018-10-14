const colors = require('colors')

const argv = require('./config/yargs').argv;
const site = require('./site/site')
const weather = require('./weather/weather')

const address = argv.address;

const getCurrentWeatherFrom = async(address) => {

    let at = await site.getLocation(address)
    console.log('Getting current weather information from', colors.yellow(`${at.address}`))
    let weat = await weather.getWeather(at.lat, at.lng)
    return { location: at, weather: weat }
}

const display = (location, weather) => {
    console.log(`Latitude ${colors.yellow(location.lat)}, ${colors.yellow(location.lng)}`)
    console.log(`Temperature (ºF) ${colors.yellow(weather.temp)} feels like ${weather.apparent}`)
    console.log(`Humidity ${colors.yellow(weather.humidity * 100)}%`)
    console.log(`Cloudd cover ${colors.yellow(weather.cloudCover * 100)}%`)
}

getCurrentWeatherFrom(argv.address)
    .then(r => {
        display(r.location, r.weather)
    })
    .catch(err => {
        console.log(err.message)
    })