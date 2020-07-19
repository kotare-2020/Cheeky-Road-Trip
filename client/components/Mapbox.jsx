import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import bathroomData from '../../data/bathroom_data2.json'
import request from 'superagent'
import { addTripInstructions } from '../actions/currentTrip'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY

class Mapbox extends React.Component {
  state = {
    lng: this.props.currentTrip.START.longitude,
    lat: this.props.currentTrip.START.latitude,
    zoom: 5.75
  }

  componentDidMount() {
    console.log(this.props.currentTrip)
    let start = [
      this.props.currentTrip.START.longitude,
      this.props.currentTrip.START.latitude
    ]
    let midCoords = ''
    this.props.currentTrip.inbetweenWaypoints.map((element) => {
        let newString = `${element.longitude},` + `${element.latitude};`
        midCoords = midCoords + newString
    })
    let end = [
      this.props.currentTrip.END.longitude,
      this.props.currentTrip.END.latitude
    ]
    
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ','  + start[1] + ';' + midCoords + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken
    request.get(url)
      .then(res => {
        console.log(res.body.routes)
        console.log(res.body.routes[0].legs[0].steps[0].maneuver.instruction)
      })

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    })

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving'
    })

    map.addControl(directions, 'top-left')

    map.on('load', () => {
      // Add an image to use as a custom marker
      directions.setOrigin([
        this.props.currentTrip.START.longitude,
        this.props.currentTrip.START.latitude,
      ])

      this.props.currentTrip.inbetweenWaypoints.map((element, i) => {
        directions.addWaypoint(i + 1, [
            element.longitude,
            element.latitude,
        ])
    })


      directions.setDestination([
        this.props.currentTrip.END.longitude,
        this.props.currentTrip.END.latitude,
      ])

      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          map.addSource('points', {
            'type': 'geojson',
            'data': bathroomData
          })
          console.log(this.props.currentTrip.waypoints.inbetweenWaypoints)

          //Add a symbol layer
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



// {
//     'type': 'FeatureCollection',
//     'features': [
//           {
//             "type": "Feature",
//             "properties": {
//               "OBJECTID": 15,
//               "NAME": "VAUTIER PARK PAVILION PUBLIC TOILETS",
//               "CLASS_DESCR": "GENERAL PUBLIC",
//               "USE_RESTRICTIONS": "7am-6pm",
//               "DESCRIPTION": "Public Toilets"
//             },
//             "geometry": {
//               "type": "Point",
//               "coordinates": [175.623499750117588, -40.335827727265396]
//             }