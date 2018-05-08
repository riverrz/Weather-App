const yargs = require("yargs");
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);

const geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response)=> {
    if (response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find that address");
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/06d047a850b1e26e5907fb3d563b9a9e/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently: ${temperature} F. It feels like: ${apparentTemperature} F`);
}).catch((e)=> {
    if (e.code==="ENOTFOUND") {
        console.log("Couldnt connect to the server");
    } else {
        console.log(e.message)
    }
})

