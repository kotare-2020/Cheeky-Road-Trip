export const getMidpointDataInJsonFormat = (midpointData) => {
  let arr = []
  midpointData.map((element) => {
    arr.push({
      "type": "Feature",
      "properties": {
        "Name": `${element.label}`
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          element.longitude,
          element.latitude
        ]
      }
    })
  })
  return arr
}

export function setDataInJsonFormat(dataForMarkers){
  const jsonData = {
      "type": "FeatureCollection",
      "name": "Midpoints",
      "crs": {
        "type": "midpoints",
        "properties": {
          "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      "features": dataForMarkers
    }
    return jsonData
}

export function setMarkers(map, jsonData, iconSizePercent, imageName, imageLink, sourceName, toggleName, visBoolean, whenDoneFunction){
  map.loadImage(
    imageLink,
    (error, image) => {
      if (error) throw error
      map.addImage(imageName, image)
      // Add a GeoJSON source with 2 points
      map.addSource(sourceName, {
        'type': 'geojson',
        'data': jsonData
      })

      map.addLayer({
        'id': sourceName,
        'type': 'symbol',
        'source': sourceName,
        'layout': {
          'icon-image': imageName,
          'icon-size': iconSizePercent,
          'text-offset': [0, 1.25],
          'text-anchor': 'top'
        }
      })
      if (toggleName != undefined ){
        document.getElementById(`${toggleName}-toggle`).addEventListener('click', e => {
          map.setLayoutProperty(
            sourceName,
            'visibility',
            visBoolean ? 'none' : 'visible'
          )
          console.log(visBoolean)
          whenDoneFunction(visBoolean, toggleName)
        })
      }
    }
  )
}

