const axios = require('axios');

const argv = require('./config/yargs').argv;
const apiKey = require('./db/key.json').googleApiKey;

const address = argv.address;

if (!address)
    return;

let encUrl = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);

axios.get(encUrl)
    .then(resp => {
        if (resp.status === 200) {

            const data = resp.data;
            if (data.status === 'ZERO_RESULTS') {
                throw new Error('No results')
            }

            const res = data.results[0]
            const loc = res.geometry.location
            console.log(res.formatted_address)
            console.log(loc.lat, loc.lng)
        } else {
            console.log(status)
        }
    })
    .catch(err => {

        if (err.errno && err.errno == 'ENOTFOUND') {
            console.log('Error: host unreachable')
        } else {
            console.log(`${err.message}`)
        }

    })