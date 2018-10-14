const argv = require('yargs')
    .options({
        address: {
            demand: true,
            description: "the address you want to know the weather about",
            alias: 'a'
        }
    })
    .help()
    .argv

module.exports = { argv }