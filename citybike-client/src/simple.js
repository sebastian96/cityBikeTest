// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    const {state} = props;
    this.state = {
      lat: state.lat,
      lng: state.lng,
      zoom: state.zoom
    }
    console.log(this.state)
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}