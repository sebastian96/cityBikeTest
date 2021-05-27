import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import SimpleExample from "./simple";

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001/getCityCoordinates",
      zoom: 12,
      lat: 51.505,
      lng: -0.09,
    };

  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
   
  }
  render() {
    const { endpoint } = this.state;

    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      this.setState({
          lat: data.latitude,
          lng: data.longitude,
          response: data.stations
        });
    });

    const position = [this.state.lat, this.state.lng];

    const handleStation = () => {
      const {response} = this.state;
      let positionStation;

      if(response) {
        return response.map(station => {
          const pos = [station.latitude, station.longitude];
          return (
            <Marker position={pos}>
              <Popup>
                <b>{station.name}</b>
                <p>free bikes: {station.free_bikes}</p>
                <p>empty slots: {station.empty_slots}</p>
              </Popup>
            </Marker>
          )
        });
        
      }
      return <></>
    }

    return (
      <div className="map">
        <h1> City Bikes in Miami </h1>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {handleStation()}
        </Map>
      </div>
    );
  }
}
export default App;
