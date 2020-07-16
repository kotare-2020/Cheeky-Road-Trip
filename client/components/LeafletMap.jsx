import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Routing from "./RoutingMachine";
import bathroomData from '../../data/bathroom_data.json'
import request from 'superagent'
import { connect } from 'react-redux'
import { setWaypoints } from '../actions/currentTrip'





class LeafletMap extends Component {
  state = {
    // Palmy?
    lat: -40.35,
    lng: 175.60,
    zoom: 13,
    isMapInit: true
  }

  componentDidMount() {
    console.log("env", process.env.POSITION_STACK_API_KEY)
    request.get("http://api.positionstack.com/v1/forward", {
      'access_key': '',// key go here as string
      //process.env.POSITION_STACK_API_KEY "how the fuck do i make work" (Richard, 2020)
      "country": "NZ",
      '& query': "87 Rugby Street, Palmerston North,",// address part goes here
    })
      .then(res => {
        console.log("api :)", res.body.data)
        this.props.dispatch(setWaypoints(res.body.data[0]))
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



//for Richard
//res.body.data will look like this:
/*
data = {
administrative_area: null,
confidence: 0.8,
continent: "Oceania",
country: "New Zealand",
country_code: "NZL",
county: null,
label: "Dufferin Street, New Zealand",
latitude: -41.301204,
locality: null,
longitude: 174.781237,
name: "Dufferin Street",
neighbourhood: "Mount Cook",
number: null,
postal_code: null,
region: "Wellington Region",
region_code: "WG",
street: "Dufferin Street",
type: "street",
}
*/