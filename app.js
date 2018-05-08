const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather")

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
    .alias('help','h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage,result)=> {
    if (errorMessage) {
        console.log(errorMessage);
        
    }else {
        console.log(result.address);
        weather.getWeather(result.latitude,result.longitude, (error, weatherResult)=> {
            if (error) {
                console.log("Couldnt fetch the weather");
            } else {
                console.log(`It's currently ${weatherResult.temperature}F. It feels like ${weatherResult.apparantTemp}F.`);
            }
        });
    }
});

