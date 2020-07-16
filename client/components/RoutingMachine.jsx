import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(-40.355612570756939, 175.611338021496039),
        L.latLng(-40.363021638597097, 175.633304176971308),
        L.latLng(-40.347821587189848, 175.627097636586257)
      ],
      // router: new L.Routing.Google(),
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
export default withLeaflet(Routing);
