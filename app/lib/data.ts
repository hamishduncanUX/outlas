import { sql } from "@vercel/postgres";
import { Resorts, Rentals, Repairs } from "../definitions/mapboxDefinitions";

//this is the function that fetches resort data from the database. Although it is not stated, this is a server function.
//what does that mean? It means that the code is executed on the servers where your code is stored, not in the user's 
//web browser on their computer or network. That's good because database calls should be controlled by us, whereas if we
//write code that empowers the user to modify database calls in their web browsers / own computers we empower bad actors
//to hijack our website with malicious code

export async function fetchResorts(){

    //initialises query to pass to database. Returns all of the information from database resorts
    const query = `SELECT * FROM resorts`

    try {

        const resortData = await sql.query<Resorts>(query);
        
        return resortData.rows;        

    } catch (error){
        console.log(error)        
        throw new Error('unspecified error');
    }
}

export const fetchRentals = async () => {

    //initialises query to pass to database. Returns all of the information from database resorts
    const query = `SELECT * FROM rentals`

    try {

        const rentalsData = await sql.query<Rentals>(query);

        const rentalsDataArray = rentalsData.rows;

        return rentalsDataArray;

    } catch (error){
        console.log(error)        
        throw new Error('unspecified error');
    }
}

export const fetchRepairs = async () => {

    //initialises query to pass to database. Returns all of the information from database resorts
    const query = `SELECT * FROM repairs`

    try {

        const repairsData = await sql.query<Repairs>(query);

        return repairsData.rows;

    } catch (error){
        console.log(error)        
        throw new Error('unspecified error');
    }
}