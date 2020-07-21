import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import bathroomData from '../../data/bathroom_data.json'
import food_data from '../../data/food_data.json'
import swim_data from '../../data/swim-data.json'
import request from 'superagent'
import { confirmAddress, eraseTrip, addTripInstructions } from '../actions/currentTrip'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY

class Mapbox extends React.Component {
  state = {
    lng: this.props.currentTrip.START.longitude,
    lat: this.props.currentTrip.START.latitude,
    zoom: 5.75,
    currentMidPoints: this.props.currentTrip.MID.length,
  }

  componentDidMount() {
    this.renderMap()
  }
  reloadMap = () => {
    this.renderMap()
  }

  componentWillUnmount() {
    this.props.dispatch(eraseTrip())
  }

  renderMap = () => {
    let start = [
      this.props.currentTrip.START.longitude,
      this.props.currentTrip.START.latitude
    ]
    let midCoords = ''
    this.props.currentTrip.MID.map((element) => {
      let newString = `${element.longitude},` + `${element.latitude};`
      midCoords = midCoords + newString
    })
    let end = [
      this.props.currentTrip.END.longitude,
      this.props.currentTrip.END.latitude
    ]

    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + midCoords + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken
    request.get(url)
      .then(res => {
        let instructionsArr = []
        res.body.routes[0].legs.map((element) => {
          element.steps.map((element) => {
            instructionsArr.push(element.maneuver.instruction)
          })
        })
        this.props.dispatch(addTripInstructions(instructionsArr))
      })

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/deriyaki/ckctmc2yt2xi01iplkz3px4bd',
      accessToken: process.env.MAPBOX_SKIN_KEY,
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

    map.on('click', 'points', (e) => {
      // There's a few different ways data is layed out in the jsons because of differing sources.
      const dataStructureType1 = {
        name: e.features[0].properties.Name
      }
      const dataStructureType2 = {
        name: e.features[0].properties.NAME,
        description: e.features[0].properties.DESCRIPTION,
        openTimes: e.features[0].properties.USE_RESTRICTIONS,
      }
      const dataStructureType3 = {
        description: "<strong>Toilets :)</strong> <p>No extra information :(</p>"
      }

      const setName = () => {
        if (dataStructureType1.name != undefined) {
          return dataStructureType1.name
        } else if (dataStructureType2.name != undefined) {
          return dataStructureType2.name
        } else {
          return "Toilets :)"
        }
      }

      const addToWaypointsNoArgs = () => {
        const nameOfToilet = setName()
        const midpoint = {
          buildingName: capitalize(nameOfToilet),
          label: "label",
          latitude: coordinates[1],
          longitude: coordinates[0],
          streetName: "street",
        }
        this.props.dispatch(confirmAddress(midpoint, "MID"))
        this.reloadMap()
      }

      const coordinates = e.features[0].geometry.coordinates.slice()
      const setToiletDescription = (descOne, descTwo, descThree) => {
        window.addToWaypoints = addToWaypointsNoArgs
        // ^--- See page buttom for explanation and tips
        if (descOne.name != undefined) {
          return (
            `<strong>${descOne.name}</strong>
            <br>
            <button onClick='window.addToWaypoints()'>Add stop to trip</button>`
          )
        }
        else if (descOne.name == undefined && descTwo.description != "null" && descTwo.description != undefined && descTwo.openTimes != "null" && descTwo.openTimes != undefined) {
          descTwo.name = capitalize(descTwo.name)
          return (
            `<strong>${descTwo.name}</strong>
            <p>${descTwo.description}</p>
            <p>Open: ${descTwo.openTimes}</p>
            <button onClick='window.addToWaypoints()'>Add stop to trip</button>`
          )
        }
        else if (descOne.name == undefined && descTwo.description == "null" || descTwo.openTimes == "null") {
          return (
            `<strong>${capitalize(descTwo.name)}</strong>
            <strong>Toilets</strong>
            <p>No extra information :(</p>
            <button onClick='window.addToWaypoints()'>Add stop to trip</button>`
          )
        }
        else {
          return (
            `${descThree.description}
            <button onClick='window.addToWaypoints()'>Add stop to trip</button>`
          )
        }
      }
      let description = setToiletDescription(dataStructureType1, dataStructureType2, dataStructureType3)

      function capitalize(sentence) {
        let arrayOfStrings = sentence.split(" ")
        if (arrayOfStrings.indexOf("") != -1) { // in case there's only one word (Longburn was being deleted >:c ) .length might've been useful)
          arrayOfStrings.splice(arrayOfStrings.indexOf(""), 1) // in case there's an extra space in a sentance ie "yo  dog."
        }
        let capitalizedArray = arrayOfStrings.map(string => {
          const wordBody = string.substr(1)
          return (string[0].toUpperCase() + wordBody.toLowerCase())
        })
        let capitalizedStr = capitalizedArray.join(' ')
        return (capitalizedStr)
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map)
    })

    directions.onClick = () => { }
    directions.onDragDown = () => { } // Stops user from moving waypoints because they don't set GS currently.
    map.addControl(directions, 'top-left')

    map.on('load', () => {
      directions.setOrigin([
        this.props.currentTrip.START.longitude,
        this.props.currentTrip.START.latitude,
      ])

      this.props.currentTrip.MID.map((element, i) => {
        directions.addWaypoint(i + 1, [
          element.longitude,
          element.latitude,
        ])
      })

      directions.setDestination([
        this.props.currentTrip.END.longitude,
        this.props.currentTrip.END.latitude,
      ])



      // SWIM MARKERS
      map.loadImage(
        './images/swimming.png',
        function (error, image) {
          if (error) throw error
          map.addImage('swim-marker', image)
          // Add a GeoJSON source with 2 points
          map.addSource('swim-points', {
            'type': 'geojson',
            'data': swim_data
          })

          map.addLayer({
            'id': 'swim-points',
            'type': 'symbol',
            'source': 'swim-points',
            'layout': {
              'icon-image': 'swim-marker',
              'icon-size': 0.95,
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          })
        }
      )

      // BATHROOM MARKERS
      map.loadImage(
        './images/toilet-icon.png',
        function (error, image) {
          if (error) throw error
          map.addImage('custom-marker', image)
          // Add a GeoJSON source with 2 points
          map.addSource('points', {
            'type': 'geojson',
            'data': bathroomData
          })
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'custom-marker',
              'icon-size': 0.95,
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          })
        }
      )

      // FOOD MARKERS
      map.loadImage(
        './images/food.png',
        function (error, image) {
          if (error) throw error
          map.addImage('food-marker', image)
          // Add a GeoJSON source with 2 points
          map.addSource('food_points', {
            'type': 'geojson',
            'data': food_data
          })

          map.addLayer({
            'id': 'food_points',
            'type': 'symbol',
            'source': 'food_points',
            'layout': {
              'icon-image': 'food-marker',
              'icon-size': 0.65,
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


// dostuff = () => {
//   console.log('hello')
// }

// window.dostuff = this.dostuff
// ^--- to make a function as global as possible.
// <button onClick='window.dostuff()'>hi</button>
// ^--- for below HTML in if statements
// window.addToWaypoints = this.addToWaypoints(coordinates, descTwo.name)
// ^--- can't use arguments?
// window.addToWaypoints = addToWaypointsNoArgs // <--- use this one (shown in above code)
// ^--- defined above in current scope (map on click) to keep variables
// because we can't use arguments (I think).