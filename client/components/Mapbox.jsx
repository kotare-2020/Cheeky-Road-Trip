import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import request from 'superagent'

//Data imports
import bathroomData from '../../data/bathroom_data.json'
import food_data from '../../data/food_data.json'
import swim_data from '../../data/swim-data.json'

//Action imports
import { confirmAddress, eraseTrip, addTripInstructions } from '../actions/currentTrip'

//Import Functions
import { getMidpointDataInJsonFormat, setMarkers, setDataInJsonFormat } from '../utils/mapboxFunctions'
import { TRUE } from 'node-sass'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY



class Mapbox extends React.Component {
  state = {
    lng: this.props.currentTrip.START.longitude,
    lat: this.props.currentTrip.START.latitude,
    zoom: 5.75,
    bRoomVis: true,
    swimVis: true,
    eatVis: true
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

    const setPopups = (e) => {
      const popup = []
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
        description: '<p class="popuptitle">Toilets :)</p> <p>No extra information :(</p>'
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
        const nameOfStop = setName()
        const midpoint = {
          buildingName: capitalize(nameOfStop),
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
            `<p class="popuptitle">${descOne.name}</p>
            <button class="popupbutton button is-small is-rounded" onClick='window.addToWaypoints()'>Add stop to trip</button>`
          )
        }
        else if (descOne.name == undefined && descTwo.description != "null" && descTwo.description != undefined && descTwo.openTimes != "null" && descTwo.openTimes != undefined) {
          descTwo.name = capitalize(descTwo.name)
          return (
            `<p class="popuptitle">${descTwo.name}</p>
            <p>${descTwo.description}</p>
            <p class="popupdesc">Open: ${descTwo.openTimes}</p>
            <button class="popupbutton button is-small is-rounded" onClick='window.addToWaypoints()'>Add stop to trip</button>`
          )
        }
        else if (descOne.name == undefined && descTwo.description == "null" || descTwo.openTimes == "null") {
          return (
            `<p class="popuptitle">${capitalize(descTwo.name)}</p>
            <p class="popuptitle">Toilets</p>
            <p>No extra information :(</p>
            <button class="popupbutton button is-small is-rounded" onClick='window.addToWaypoints()'>Add stop to trip</button>`
          )
        }
        else {
          return (
            `${descThree.description}
            <button class="popupbutton button is-small is-rounded" onClick='window.addToWaypoints()'>Add stop to trip</button>`
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
      popup[0] = {
        coordinates: coordinates,
        description: description,
        map: map
      }
      return (
        popup[0]
      )
    }

    map.on('click', 'points', (e) => {
      let marker = {
        popup: {}
      }
      marker.popup = setPopups(e)
      new mapboxgl.Popup()
        .setLngLat(marker.popup.coordinates)
        .setHTML(marker.popup.description)
        .addTo(marker.popup.map)
    })
    map.on('click', 'food-points', (e) => {
      let marker = {
        popup: {}
      }
      marker.popup = setPopups(e)
      new mapboxgl.Popup()
        .setLngLat(marker.popup.coordinates)
        .setHTML(marker.popup.description)
        .addTo(marker.popup.map)
    })
    map.on('click', 'swim-points', (e) => {
      let marker = {
        popup: {}
      }
      marker.popup = setPopups(e)
      new mapboxgl.Popup()
        .setLngLat(marker.popup.coordinates)
        .setHTML(marker.popup.description)
        .addTo(marker.popup.map)
    })

    directions.onClick = () => { }
    directions.onDragDown = () => { } // Stops user from moving waypoints because they don't set GS currently.
    map.addControl(directions, 'top-left')

    map.on('load', () => {
      directions.removeWaypoint(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24)
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


      //MARKERS

      let isSwimVis = true
      let isBRoomVis = true
      let isEatVis = true

      const whenDone = (visBoolean, toggleName) => {
        if (toggleName == 'swim') {
          if (visBoolean) {
            isSwimVis = false
          } else {
            isSwimVis = true
          }
        }
        else if (toggleName == 'bathroom') {
          if (visBoolean) {
            isBRoomVis = false
          } else {
            isBRoomVis = true
          }
        }
        else if (toggleName == 'food') {
          if (visBoolean) {
            isEatVis = false
          } else {
            isEatVis = true
          }
        }
      }

      //MIDPOINT MARKERS
      let midpointData = setDataInJsonFormat(getMidpointDataInJsonFormat(this.props.currentTrip.MID))

      setMarkers(map, midpointData, 0.60, 'stopover-marker', './images/stopover-icon.png', 'stop-overs')

      // SWIM MARKERS
      setMarkers(map, swim_data, 0.70, 'swim-marker', './images/swimming.png', 'swim-points', 'swim', isSwimVis, whenDone)

      // BATHROOM MARKERS
      setMarkers(map, bathroomData, 0.95, 'custom-marker', './images/toilet-icon.png', 'points', 'bathroom', isBRoomVis, whenDone)

      // FOOD MARKERS
      setMarkers(map, food_data, 0.65, 'food-marker', './images/food.png', 'food-points', 'food', isEatVis, whenDone)

    })
  }

  render() {
    return (
      <div>
        <div id="toggle-map-layers" className="toggle-map-layers" >
          <button id='bathroom-toggle' className="toggle-map-layers-buttons"> Bathrooms </button>
          <button id='food-toggle' className="toggle-map-layers-buttons">Eating</button>
          <button id='swim-toggle' className="toggle-map-layers-buttons">Swimming</button>
        </div>
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
