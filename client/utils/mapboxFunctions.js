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

export function setMidPointMarkers(map, dataForMarkers){
  map.loadImage(
    './images/stopover-icon.png',
    (error, image) => {
      if (error) throw error
      map.addImage('stopover-marker', image)
      // Add a GeoJSON source with 2 points
      let data = {
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
      map.addSource('stop-overs', {
        'type': 'geojson',
        'data': data
      })

      map.addLayer({
        'id': 'stop-overs',
        'type': 'symbol',
        'source': 'stop-overs',
        'layout': {
          'icon-image': 'stopover-marker',
          'icon-size': 0.60,
          'text-offset': [0, 1.25],
          'text-anchor': 'top'
        }
      })
    }
  )
}