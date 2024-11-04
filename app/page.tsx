import Image from "next/image";
import { sql } from "@vercel/postgres";
import Map from "./ui/mapbox/map";
import { fetchResorts, fetchRentals } from "./lib/data";
import { Resorts, Rentals } from "./definitions/mapboxDefinitions";

export default async function Home(): Promise<JSX.Element> { 
  
  const [resorts, rentals] = await Promise.all([
    fetchResorts(),
    fetchRentals(),
  ]);  
  
  return (
          <>
            <Map
              resorts={resorts}
              rentals={rentals}
            ></Map>            
          </>    
  );
}