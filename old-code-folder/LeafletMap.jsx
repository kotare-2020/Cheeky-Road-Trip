import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Routing from "./RoutingMachine";
import bathroomData from '../../data/bathroom_data2.json'
import { connect } from 'react-redux'


class LeafletMap extends Component {
  state = {
    lat: this.props.currentTrip.waypoints.startWaypoint.latitude,
    lng: this.props.currentTrip.waypoints.startWaypoint.longitude,
    zoom: 14,
    isMapInit: true
  }


  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true

    })
  }

  renderLoos = () => {
    return bathroomData.features.map((bathroom, i) => {
      const coords = bathroom.geometry.coordinates
      return <Marker key={i} position={[coords[1], coords[0]]} />
    })
  }



  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}'
          apikey={process.env.THUNDERFOREST_API_KEY}
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

