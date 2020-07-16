// import React, { Component } from "react";
// import { Map, TileLayer, withLeaflet, MapControl } from "react-leaflet";
// import MapInfo from "./MapInfo";
// import Routing from "./RoutingMachine";

//leaflet map


import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import Routing from "./RoutingMachine";
import L from 'leaflet'

export default class LeafletMap extends React.Component {
  state = {
    lat: -40.35, 
    lng: 175.60,
    zoom: 13,
    isMapInit: true
  }
  saveMap = map => {
    this.map = map
    this.setState({
      isMapInit: false
    })
  }
  

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.state.isMapInit && <Routing map={this.map} />}
      </Map>
    );
  }
}



// class MapComponent extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       lat: 17.4,
//       lng: 78.4,
//       zoom: 7,
//       isMapInit: false
//     };
//   }

//   saveMap = map => {
//     this.map = map;
//     this.setState({
//       isMapInit: true
//     });
//   };

//   render() {
//     const { lat, lng, zoom } = this.state;
//     const position = [lat, lng];

//     return (
//       <Map center={position} zoom={zoom} ref={this.saveMap}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {this.state.isMapInit && <Routing map={this.map} />}
//       </Map>
//     );
//   }
// }

// export default MapComponent;
