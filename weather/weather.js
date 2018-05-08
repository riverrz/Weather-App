const request = require("request");


const getWeather = (lat,lng, callback)=> {
    request({
        url: `https://api.darksky.net/forecast/06d047a850b1e26e5907fb3d563b9a9e/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
              temperature: body.currently.temperature,
              apparantTemp: body.currently.apparentTemperature
            });
        } else {
            callback("Unable to fetch from the servers");
        }
    });
};

module.exports.getWeather = getWeather;