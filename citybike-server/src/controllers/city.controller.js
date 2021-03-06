const axios = require('axios');

class City {
    constructor() {
        this.citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach";
    }

    async getCity () {
        const response = await axios.get(this.citybikeurl);
        const {location, stations} = response.data.network;
        if(location && stations) {
            return { 
                latitude: location.latitude, 
                longitude: location.longitude,
                stations
            }
        }
    }
}

module.exports = new City();