import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { withLeaflet } from "react-leaflet";
import { connect } from 'react-redux'

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(this.props.currentTrip.startPoint[0], this.props.currentTrip.startPoint[1]),
        L.latLng(this.props.currentTrip.endPoint[0], this.props.currentTrip.endPoint[1]),
        // L.latLng(this.props.currentTrip.waypoint.latitude, this.props.currentTrip.waypoint.longitude),
      ],
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

