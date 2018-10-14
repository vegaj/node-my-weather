const colors = require('colors')

const argv = require('./config/yargs').argv;
const site = require('./site/site')

const address = argv.address;

site.getLocation(address)
    .then(res => {
        console.log(colors.yellow(res.address));
        console.log(res.lat, res.lng);
    })
    .catch(err => console.log(err.message))