const axios = require('axios')

const apiKey = require('../db/key.json').googleApiKey;

const getLocation = async(address) => {
    let encUrl = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);

    let resp = await axios.get(encUrl);

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No results for ${address}`);
    }

    const result = resp.data.results[0];
    let loc = result.geometry.location;

    return {
        address: result.formatted_address,
        lat: loc.lat,
        lng: loc.lng
    }
}

module.exports = {
    getLocation
}