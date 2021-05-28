import React, { Component } from "react";
import {io} from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      zoom: 13,
      lat: 51.505,
      lng: -0.09,
      timeBack: []
    }; 

    localStorage.clear();
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);

    let time = setInterval(() => {
      socket.emit("city:get", {});
      clearInterval(time)
      time = setInterval(() => {
        socket.emit("city:get", {});
      }, 20000)
    }, 100)

    socket.on("city:get", (data) => {
      const {latitude, longitude, stations} = data;
      const time = new Date();
      const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

      localStorage.setItem(`${time.getHours()}:${minutes}`, JSON.stringify(stations));
      
      this.setState({
        lat: latitude,
        lng: longitude,
        response: stations,
        timeBack: Object.keys(localStorage)
      });
    })
  }

  handleStation(data) {
    if(data) {
      return data.map(station => {
        const pos = [station.latitude, station.longitude];
        return (
          <Marker position={pos} key={station.id}>
            <Popup>
              <b>{station.name}</b>
              <ul>
                <li><b>free bikes:</b> {station.free_bikes}</li>
                <li><b>empty slots:</b> {station.empty_slots}</li>
              </ul>
            </Popup>
          </Marker>
        )
      });
    }
    return <></>
  }

  handleClick (e) {
    const item = e.target.textContent;
    const data = JSON.parse(localStorage.getItem(item));
    this.setState({
      response: data,
    })
  }

  render() {
    const {lat, lng, zoom, timeBack, response} = this.state;
    const position = [lat, lng];

    return (
      <>
        <div className="map">
          <h1> City Bikes in Miami </h1>
          <Map center={position} zoom={zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.handleStation(response)}
          </Map>
        </div>
        <h2>Back to time</h2>
        <div className="time-box">
          {timeBack.sort().map(key => (
            <button key={key} onClick={this.handleClick.bind(this)}>{key}</button>
          ))}
        </div>
      </>
    );
    
  }
}
export default App;
