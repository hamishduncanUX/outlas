import Map from "./ui/mapbox/map";
import { fetchResorts, fetchRentals, fetchRepairs } from "./lib/data";

export default async function Home(): Promise<JSX.Element> { 
  
  const [resorts, rentals, repairs] = await Promise.all([
    fetchResorts(),
    fetchRentals(),
    fetchRepairs()
  ]);  
  
  return (
          <>
            <Map
              resorts={resorts}
              rentals={rentals}
              repairs={repairs}
            ></Map>            
          </>    
  );
}