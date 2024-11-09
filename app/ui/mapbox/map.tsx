"use client"

import { useRef, useEffect, useState, MutableRefObject } from 'react'
import mapboxgl, { LngLatLike, GeoJSONSourceRaw } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Resorts, Rentals, Repairs } from '@/app/definitions/mapboxDefinitions';
import Sidebar from '../sidebar';


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

//defines initial values to be adopted by state
const INITIAL_CENTER: [number, number] = [
  -4.205, 
  57.122
]
const INITIAL_ZOOM = 6.56

//main React function
export default function Map(
  {
    resorts,
    rentals,
    repairs
  }:
  {
    resorts: Resorts[],
    rentals: Rentals[],
    repairs: Repairs[]
  }
) { 
  
    //configures mapbox variables
    const mapRef = useRef()
    const mapContainerRef = useRef<HTMLDivElement>()
    const markerRef = useRef();
    
    //initialises state for focal position of map, degree of zoom, sidebar display and sidebar content
    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)
    const [sidebar, setSidebar] = useState(false)
    const [sidebarContent, setSidebarContent] = useState<Rentals | Repairs | Resorts | undefined>();

    //fetches mapbox access token from .env
    mapboxgl.accessToken=process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';  
    
    //combines all the rentals, resorts and repairs data into a single array
    const allDatabaseData = [...repairs, ...rentals, ...resorts];
    

    //This parses the database data passed via resorts prop to create an array of features, which will
    //be rendered as red dots on the map - locations of interest incl resorts
    /*
    const features = kajungArray.map((x) => {
      let markerColor: string;
      switch(typeof x){
        case 'resorts':
          markerColor = '#00ff00';
          break;
        case 'repairs':
          markerColor = '#FF0000';
          break;
        case 'rentals':
          markerColor = '#0000FF';
          break;
        default:
          markerColor = '#ffff00';
          break;
      }
      return {
        geometry:
        {
          coordinates:
          [
            x.long, x.lat
          ],
          type: "Point"
        },
        properties: {
          id: x.slug,
          markerColor: markerColor
        },
        type: "Feature"
      }
    })
*/
    //This is a function which takes as input an array of objects with data about either resorts, rentals or repairs,
    //along with an arrayType argument of "resorts", "rentals" or "repairs" and outputs a simplified array of objects
    //containing the latitude, longitude, pin colour and other essential details to enable rendering on the map
    //(see below)
    function features(inputArray: Resorts[] | Rentals[] | Repairs[], arrayType: string){
      let markerColor: string;
      switch(arrayType){
        case 'resorts':
          markerColor = '#00ff00';
          break;
        case 'repairs':
          markerColor = '#FF0000';
          break;
        case 'rentals':
          markerColor = '#0000FF';
          break;
        default:
          markerColor = '#ffff00';
          break;
      }
      const outputArray = inputArray.map((x) => {        
        return {
          geometry:
          {
            coordinates:
            [
              x.long, x.lat
            ],
            type: "Point"
          },
          properties: {
            id: x.slug,
            markerColor: markerColor,
            dataType: arrayType
          },
          type: "Feature"
        }
      })
      return outputArray;

    }
    
    //this calls the above features function for all the different types of location - rental, resorts and repairs - and combines
    //the resulting data into a single array     
    const pinsDataAllLocationTypes = features(resorts, 'resorts').concat(features(rentals, 'rentals'), features(repairs, 'repairs'));
    
    // this takes the data from the above variable pinsDataAllLocationTypes to arrange the data in a format
    //readable by the mapbox logic (creates an empty locations geojson object)
    let mapLocations = {
      type: "FeatureCollection",
      features: pinsDataAllLocationTypes,      
    };


    //very important function, on first load and rerender this automatically renders the map
    useEffect(() => {
        //creates a new instance of Map, centered and zoomed as per the current state values   
        if (!mapContainerRef.current){
          return;
        }
        /*
        if (mapContainerRef.current){
          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
          center: center,
          style: "mapbox://styles/hambourine/clmrfyzl1028001r4b6x47hyx",
          zoom: zoom
        });          
        }        
        */
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: center,
          style: "mapbox://styles/hambourine/clmrfyzl1028001r4b6x47hyx",
          zoom: zoom
        });

        //when the user moves the map, this obtains the new values for centre and zoom and updates the state
        mapRef.current.on('move', () => {
        // get the current center coordinates and zoom level from the map
        const mapCenter = mapRef.current.getCenter()
        const mapZoom = mapRef.current.getZoom()

        // update state
        setCenter([ mapCenter.lng, mapCenter.lat ])
        setZoom(mapZoom)
        })        
        
        //similar to the parent useEffect function, this detects when it will be necessary to add a layer of additional detail...
        mapRef.current.on('load', () => {
        //...specifically this layer of the red dots marking locations of interesting, incl resorts
          mapRef.current.addLayer({
          id: "locations",
          type: "circle",
          /* Add a GeoJSON source containing place coordinates and information. */
          source: {
              type: "geojson",
              data: mapLocations, //see mapLocations and features const variables above, the data of which is imported here
          },
          paint: {
              "circle-radius": 10,
              "circle-stroke-width": 0,
              "circle-color": ["get", "markerColor"],
              "circle-opacity": 1,
              "circle-stroke-color": "#800080",
          },
      });
    })      

           // Initialize the map
           //const map = new mapboxgl.Map({});
           // Set an event listener
    /*
           mapRef.current.on('click', (e: any) => {
      console.log(`A click event has occurred at ${e.lngLat}`);
      const features = mapRef.current.queryRenderedFeatures(e.point, {
        layers: ['locations'] // replace with your layer name
        });
        if (!features.length) {
        return;
        }
        const feature = features[0];
        console.log('click function...')
        console.log(feature);
    });*/

mapRef.current.on("click", "locations", (e: any) => {
  //find ID of collection item in array
const ID = e.features[0].properties.id;
const details = allDatabaseData.filter((x) => {
  return x.slug === ID;
})
setSidebarContent(details[0]);
setSidebar(true);

/*
.setHTML(
         `<h3>${e.features[0].properties.id}</h3><p>${e.features[0].properties.description}</p>`
       ) */
     //add popup 
     const popup = new mapboxgl.Popup({ offset: [0, -15] })
       .setLngLat(e.features[0].geometry.coordinates)
       .setHTML(
        `<h3>${details[0].name}</h3>`
       )
       
       .addTo(mapRef.current);

 //addPopup(e);
      })

    /*popover code starts*/
    const monument: LngLatLike = [-3.1409, 57];
    /*mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: monument,
      zoom: 15
    });*/

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
    );

   new mapboxgl.Marker(markerRef.current)
    .setLngLat(monument)
    .setPopup(popup)
    .addTo(mapRef.current);/**/
   /*popover code ends*/
    
    
        return () => {
          mapRef.current.remove()
        }
      }, []) //useEffect function ends
      
      

      //this manages the user's interactions with the maps, zooming and moving centre
      const handleButtonClick = () => {
        mapRef.current.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM
        })
      }

      const handleSidebarClick = () => {
        console.log('handleSidebarClick activated');
        return setSidebar(true);        
      }

      const handleCloseClick = () => {
        return setSidebar(!sidebar);
      }

  return (
    <>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <button className='reset-button' onClick={handleButtonClick}>
        Reset
      </button>
      <button className='reset-button' style={{top: '100px'}} onClick={handleSidebarClick}>
        sidebar
      </button>
      <div id='map-container' ref={mapContainerRef}/>
      <Sidebar 
        show={sidebar}
        content={sidebarContent}
        closeNav={handleCloseClick}
      />
    </>    
  );
}