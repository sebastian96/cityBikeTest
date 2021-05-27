import React, { Component } from "react";
import {io} from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      zoom: 12,
      lat: 51.505,
      lng: -0.09,
    };

  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);

    socket.emit("city:get", {});

    socket.on("city:get", (data) => {
      const {latitude, longitude, stations} = data;
      this.setState({
        lat: latitude,
        lng: longitude,
        response: stations
      });
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const handleStation = () => {
      const {response} = this.state;

      if(response) {
        return response.map(station => {
          const pos = [station.latitude, station.longitude];
          return (
            <Marker position={pos} key={station.id}>
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
