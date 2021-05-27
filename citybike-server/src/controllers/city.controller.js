const axios = require('axios');

class City {
    constructor() {
        this.citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach";
    }

    async getCityCoordinates (req, res) {
        const response = await axios.get(this.citybikeurl);
        const {latitude, longitude} = response.data.network.location;
        res.send({ latitude, longitude}).status(200);
    }
}

module.exports = new City();