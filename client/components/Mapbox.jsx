import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY

class Mapbox extends React.Component {
  state = {
    lng: 174.6785,
    lat: -38.3172,
    zoom: 5.75
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving'
    })

    map.addControl(directions, 'top-left')

    map.on('load', () => {
      // Add an image to use as a custom marker
      directions.setOrigin([
        this.props.currentTrip.waypoints.startWaypoint.longitude,
        this.props.currentTrip.waypoints.startWaypoint.latitude,
      ])

      directions.setDestination([
        this.props.currentTrip.waypoints.endWaypoint.longitude,
        this.props.currentTrip.waypoints.endWaypoint.latitude,
      ])

      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          map.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  "type": "Feature",
                  "properties": {
                    "OBJECTID": 15,
                    "NAME": "VAUTIER PARK PAVILION PUBLIC TOILETS",
                    "CLASS_DESCR": "GENERAL PUBLIC",
                    "USE_RESTRICTIONS": "7am-6pm",
                    "DESCRIPTION": "Public Toilets"
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [175.623499750117588, -40.335827727265396]
                  }
                }
              ]
            }
          });

          // Add a symbol layer
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'NAME'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          })
        }
      )
    })
  }

  render() {
    return (
      <div>
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}

const mapStateToProps = ({ currentTrip }) => {
  return {
    currentTrip,
  }
}

export default connect(mapStateToProps)(Mapbox)


