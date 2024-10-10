import Image from "next/image";
import { sql } from "@vercel/postgres";
import Map from "./ui/mapbox/map";
import { fetchResorts } from "./lib/data";
import { Resorts } from "./definitions/mapboxDefinitions";

export default async function Home(): Promise<JSX.Element> {  

  const resorts: Resorts[] = await fetchResorts();  

  return (
          <>
            <Map
              resorts={resorts}
            ></Map>            
          </>    
  );
}