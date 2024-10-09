"use client"

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import data from './mockApiData.json';

//Proof of concept for mapbox-gl usage within nextjs (React) app

/*
Notes:
1) Has to be a "use client" module (see above) in order for useEffect to be used. Note that Nextjs has strict rules about
modules from which database calls can be made and modules which use client. Database calls should be made from server
modules (ie not this one) for security reasons. Database calls can be passed via props to ui components (such as this one)
for optimum security

2) For some reason, the .env mapboxAccessToken has to have the specific label "NEXT_PUBLIC_MAPBOX_TOKEN" or the app throws
an error

*/

const INITIAL_CENTER = [
  -4.205, 
  57.122
]
const INITIAL_ZOOM = 6.56

const features = data.map((x) => {
  return {
    geometry:
    {
      coordinates:
      [
        x.Long, x.Lat
      ],
      type: "Point"
    },
    properties: {
      id: x.Slug,
      markerColor: "#fc000b"
    },
    type: "Feature"
  }
})

//console.log(features);

// create empty locations geojson object
let mapLocations = {
  type: "FeatureCollection",
  features: features,
};

export default function Map() {

    const mapRef = useRef()
    const mapContainerRef = useRef()
    
    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    mapboxgl.accessToken=process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
/*
    console.log('map...')
    console.log(Map)

    console.log('mapRef...')
    console.log(mapRef)*/
    
    /*
    function addMapPoints() {
      /* Add the data to your map as a layer *//*
      mapRef.addLayer({
          id: "locations",
          type: "circle",
          /* Add a GeoJSON source containing place coordinates and information. *//*
          source: {
              type: "geojson",
              data: mapLocations,
          },
          paint: {
              "circle-radius": 10,
              "circle-stroke-width": 0,
              "circle-color": ["get", "markerColor"],
              "circle-opacity": 1,
              "circle-stroke-color": "#FFFF00",
          },
      });
    }
    */

    useEffect(() => {        
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: center,
          style: "mapbox://styles/hambourine/clmrfyzl1028001r4b6x47hyx",            
          zoom: zoom
        });

        mapRef.current.on('move', () => {
        // get the current center coordinates and zoom level from the map
        const mapCenter = mapRef.current.getCenter()
        const mapZoom = mapRef.current.getZoom()

        // update state
        setCenter([ mapCenter.lng, mapCenter.lat ])
        setZoom(mapZoom)
        })

        
        console.log(mapRef);
        //load mappoints
        //addMapPoints();
        
        mapRef.current.on('load', () => {
        mapRef.current.addLayer({
          id: "locations",
          type: "circle",
          /* Add a GeoJSON source containing place coordinates and information. */
          source: {
              type: "geojson",
              data: mapLocations,
          },
          paint: {
              "circle-radius": 10,
              "circle-stroke-width": 0,
              "circle-color": ["get", "markerColor"],
              "circle-opacity": 1,
              "circle-stroke-color": "#FFFF00",
          },
      });/**/
    })

    /*
      mapRef.current.on('load', () => {
        const layers = mapRef.current.getStyle().layers;
        let firstSymbolId;
        for (const layer of layers) {
          if (layer.type === 'symbol') {
            firstSymbolId = layer.id;
            break;
          }
        }
  
        mapRef.current.addSource('urban-areas', {
          type: 'geojson',
          data: 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
        });
        mapRef.current.addLayer(
          {
            id: 'urban-areas-fill',
            type: 'fill',
            source: 'urban-areas',
            layout: {},
            paint: {
              'fill-color': '#f08',
              'fill-opacity': 0.4
            }
          },
          firstSymbolId
        );
      })
        */
      
    
        return () => {
          mapRef.current.remove()
        }
      }, [])

      const handleButtonClick = () => {
        mapRef.current.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM
        })
      }

  return (
    <>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <button className='reset-button' onClick={handleButtonClick}>
        Reset
      </button>
      <div id='map-container' ref={mapContainerRef}/>
    </>    
  );
}

/*
[
  {
    geometry:
     {
       coordinates:
       [
         "-3.829261019496421",
         "57.18911925968182"
       ],
       type: "Point"
     },
  properties: {
    arrayID: 0,
    description: "<div class=\"w-embed\"><input type=\"hidden\" id=\"locationID\" value=\"the-snowboard-asylum\">\n<input type=\"hidden\" id=\"locationLatitude\" value=\"57.18911925968182\">\n<input type=\"hidden\" id=\"locationLongitude\" value=\"-3.829261019496421\"></div><div class=\"locations-map_name\"><div class=\"text-block\">The Snowboard Asylum</div></div><div class=\"locations-map_population-wrapper\"><div class=\"text-block-2\">Scotland</div></div>",
    id: "the-snowboard-asylum",
    markerColor: "#fc000b"
  },
  type: "Feature"
  }
  ]
*/