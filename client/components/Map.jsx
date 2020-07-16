import MapInfo from "./MapInfo";
import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Routing from "./RoutingMachine";
import L, { Icon } from 'leaflet'
import bathroomData from '../../data/bathroom_data.json'
import LCG from 'leaflet-control-geocoder';
import request from 'superagent'






export default class LeafletMap extends Component {
  state = {
    lat: -40.35, 
    lng: 175.60,
    zoom: 13,
    isMapInit: true 
  }

  componentDidMount() {
    // const map = this.map.leafletElement;
    // console.log(map)
    // const geocoder = LCG.L.Control.Geocoder.nominatim();
    // let marker;
    request.get("http://api.positionstack.com/v1/forward", {
      'access_key': 'thingy goes',
      "country": "NZ",
      '& query': "3/11 Dufferin Street, Mount Victoria, 6021, Wellington, New Zealand",
    })  
      .then (res => {
        console.log(res.body.data)
      })

    // map.on('click', e => {
    //     geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), results => {
    //         var r = results[0];
    //         if (r) {
    //             if (marker) {
    //                 marker.
    //                     setLatLng(r.center).
    //                     setPopupContent(r.html || r.name).
    //                     openPopup();
    //             } else {
    //                 marker = L.marker(r.center)
    //                     .bindPopup(r.name)
    //                     .addTo(map)
    //                     .openPopup();
    //             }
    //         }
    //     })
    // })
}

  
  saveMap = map => {
    this.map = map;
    // console.log(map.leafletElement)
    this.setState({
      isMapInit: true
      
    })
  }

  renderLoos = () => {
    return bathroomData.features.map((bathroom) => {
      const coords = bathroom.geometry.coordinates
      return <Marker key={bathroom.properties.OBJECTID} position={[coords[1], coords[0]]}/>
    })

    
    // <Marker position={[ -40.355660031809151, 175.611366794810721  ]}> <Popup>Mall Toilets</Popup>
    // </Marker>
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.renderLoos()}
        
       
        {this.state.isMapInit && <Routing map={this.map}
         />}
      </Map>
    );
  }
}



  // onEachFeature = (feature, layer) => {
  //   console.log('onEachFeature fired: ');
  //   layer.on({
  //       mouseover: (e) => this.MouseOverFeature(e, feature),
  //       mouseout: (e) => this.MouseOutFeature(e, feature)

  //   });

/*
{
administrative_area: null
confidence: 0.8
continent: "Oceania"
country: "New Zealand"
country_code: "NZL"
county: null
label: "Dufferin Street, New Zealand"
latitude: -41.301204
locality: null
longitude: 174.781237
name: "Dufferin Street"
neighbourhood: "Mount Cook"
number: null
postal_code: null
region: "Wellington Region"
region_code: "WG"
street: "Dufferin Street"
type: "street"
}*/