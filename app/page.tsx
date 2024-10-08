import Image from "next/image";
import { sql } from "@vercel/postgres";
import Map from "./ui/mapbox/map";

export default async function Cart(
  
): Promise<JSX.Element> {
  //this shows the database link is working
  const { rows } = await sql`SELECT * FROM testTable`;
  //logs the output from the database
  console.log(rows);

  return (
          <>
            <Map></Map>
          </>    
  );
}