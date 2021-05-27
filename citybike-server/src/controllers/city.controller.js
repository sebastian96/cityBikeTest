const axios = require('axios');

class City {
    constructor() {
        this.citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach";
    }

    async getCityCoordinates (req, res) {
        const response = await axios.get(this.citybikeurl);
        const {location, stations} = response.data.network;
        res.send({ 
            latitude: location.latitude, 
            longitude: location.longitude,
            stations
        }).status(200);
    }
}

module.exports = new City();