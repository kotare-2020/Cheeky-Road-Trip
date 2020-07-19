import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import bathroomData from '../../data/bathroom_data2.json'
import request from 'superagent'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY

class Mapbox extends React.Component {
  state = {
    lng: this.props.currentTrip.waypoints.startWaypoint.longitude,
    lat: this.props.currentTrip.waypoints.startWaypoint.latitude,
    zoom: 5.75
  }

  componentDidMount() {
    let start = [
      this.props.currentTrip.waypoints.startWaypoint.longitude,
      this.props.currentTrip.waypoints.startWaypoint.latitude
    ]
    let end = [
      this.props.currentTrip.waypoints.endWaypoint.longitude,
      this.props.currentTrip.waypoints.endWaypoint.latitude
    ]

    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken
    request.get(url)
      .then(res => console.log('steps to take', res.body))

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

    console.log("directions", directions)
    console.log("directions.onClick", directions.onClick)
    // directions.onClick = null
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
            'data': bathroomData
          })

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

      map.on('click', 'points', function (e) {
        // There's a few different ways data is layed out in the json because of differing sources.
        const dataStructureType1 = {
          name: e.features[0].properties.Name
        }
        const dataStructureType2 = {
          name: e.features[0].properties.TOILET_NAME,
          description: e.features[0].properties.DESCRIPTION,
          openTimes: e.features[0].properties.USE_RESTRICTIONS,
        }
        const dataStructureType3 = {
          description: "<strong>Toilets :)</strong> <p>No extra information :(</p>"
        }

        const coordinates = e.features[0].geometry.coordinates.slice();
        let description = setToiletDescription(dataStructureType1, dataStructureType2, dataStructureType3)

        function setToiletDescription(descOne, descTwo, descThree) {
          if (descOne.name != undefined) {
            return `<strong>${descOne.name}</strong>`
          }
          else if (descOne.name == undefined && descTwo.description != "null" && descTwo.description != undefined && descTwo.openTimes != "null" && descTwo.openTimes != undefined) {
            return (
              `<strong>${capitalize(descTwo.name)}</strong>
              <p>${descTwo.description}</p>
              <p>Open: ${descTwo.openTimes}</p>`
            )
          }
          else if (descOne.name == undefined && descTwo.description == "null" || descTwo.openTimes == "null") {
            return (
              `<strong>${capitalize(descTwo.name)}</strong>
              <strong>Toilets</strong>
              <p>No extra information :(</p>`
            )
          }
          else {
            return descThree.description
          }
        }

        function capitalize(sentence) {
          let arrayOfStrings = sentence.split(" ")
          if (arrayOfStrings.indexOf("") != -1){ // in case there's only one word (Longburn was being deleted >:c ) .length might've been useful)
            arrayOfStrings.splice(arrayOfStrings.indexOf(""), 1) // in case there's an extra space in a sentance ie "yo  dog."
          }
          let capitalizedArray = arrayOfStrings.map(string => {
            const wordBody = string.substr(1)
            return (string[0].toUpperCase() + wordBody.toLowerCase())
          })
          let capitalizedStr = capitalizedArray.join(' ')
          return (capitalizedStr)
        }

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        /*
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        */

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });
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