import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Routing from "./RoutingMachine";
import bathroomData from '../../data/bathroom_data.json'
import request from 'superagent'
import { connect } from 'react-redux'





class LeafletMap extends Component {
  state = {
    lat: -40.35,
    lng: 175.60,
    zoom: 13,
    isMapInit: true
  }

  componentDidMount() {
    request.get("http://api.positionstack.com/v1/forward", {
      'access_key': '',
      "country": "NZ",
      '& query': "address part goes here",
    })
      .then(res => {
        console.log(res.body.data)
      })
  }


  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true

    })
  }

  renderLoos = () => {
    return bathroomData.features.map((bathroom) => {
      const coords = bathroom.geometry.coordinates
      return <Marker key={bathroom.properties.OBJECTID} position={[coords[1], coords[0]]} />
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
        {this.renderLoos()}


        {this.state.isMapInit && <Routing map={this.map}
        />}
      </Map>
    );
  }
}

const mapStateToProps = ({ auth, currentTrip }) => {
  return {
    auth,
    currentTrip,
  }
}

export default connect(mapStateToProps)(LeafletMap)





  // onEachFeature = (feature, layer) => {
  //   console.log('onEachFeature fired: ')
  //   layer.on({
  //       mouseover: (e) => this.MouseOverFeature(e, feature),
  //       mouseout: (e) => this.MouseOutFeature(e, feature)

  //   })