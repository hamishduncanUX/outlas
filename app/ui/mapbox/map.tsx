"use client"

import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

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

export default function Map() {

    const mapRef = useRef()
    const mapContainerRef = useRef()    

    mapboxgl.accessToken=process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';   

    useEffect(() => {        
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
        });
    
        return () => {
          mapRef.current.remove()
        }
      }, [])

  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>    
  );
}