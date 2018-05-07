const request = require("request");

const geocodeAddress = (address)=> {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log("Unable to connect to Google servers ");
        } else if (body.status === "ZERO_RESULTS") {
            console.log("Unable to find that address");
        } else if (body.status === "OK") {
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        } else {
            console.log("Try again later");
        }
    });
}

module.exports = {
    geocodeAddress
}