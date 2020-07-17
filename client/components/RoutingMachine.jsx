import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { withLeaflet } from "react-leaflet";
import { connect } from 'react-redux'

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    const waypoints = []

    waypoints.push(L.latLng(
      this.props.currentTrip.waypoints.startWaypoint.latitude,
      this.props.currentTrip.waypoints.startWaypoint.longitude
      ))
    for (let i = 0; i < this.props.currentTrip.waypoints.inbetweenWaypoints.length; i++) {
        waypoints.push(L.latLng(
          this.props.currentTrip.waypoints.inbetweenWaypoints[i].latitude,
          this.props.currentTrip.waypoints.inbetweenWaypoints[i].longitude
        ))
    }
    waypoints.push(L.latLng(
      this.props.currentTrip.waypoints.endWaypoint.latitude,
      this.props.currentTrip.waypoints.endWaypoint.longitude
      ))
    console.log("waypoints", waypoints)

    let leafletElement = L.Routing.control({
      waypoints,
      lineOptions: {
        styles: [
          {
            color: "purple",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}

const mapStateToProps = ({ auth, currentTrip }) => {
  return {
    auth,
    currentTrip,
  }
}

export default connect(mapStateToProps)(withLeaflet(Routing))

