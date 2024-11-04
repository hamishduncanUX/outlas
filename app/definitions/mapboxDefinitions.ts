//this is a type definition. TypeScript is so named because pieces of data have to be given type descriptions.
//Eg: resort_name below should be a string ('text in quote marks') not a number (eg: 24 [note no quote marks]).
//This gives a summary of all the data types expected from the database. Moreover, it gives a structure for the
//data packets sent from the database. It won't throw an error if data doesn't fit that structure, but VS Code
//will highlight any code which appears to demonstrate a clash. This helps maintain awareness of exactly what
//data structures will be passed in different situations, as passing data in packets that clash with those structures
//could cause an error if we have designed logic that expects one set of values but gets another

export type Repairs = {
      name: string;
      repair_address: string;
      repair_phone: string;
      repair_website: string;
      regions: string;
      accept_in_person_visits: string;
      image: string;
      opening_times: string;
      item_id: string;
      slug: string;
      status: string;
      lat: number;
      long: number;
}

export type Rentals = {
      rental_name: string;
      slug: string;
      item_id: string;
      resorts: string;
      gear_for_rent: string;
      email_address: string;
      profile_picture: string;
      resort_description: string;
      phone_number: string;
      resort_website: string;
      social_media_link: string;
      reason_signed_up: string;
      resort_Address: string;
      lat: number;
      long: number;
      regions: string;

}

export type Resorts = {
    resort_name: string;
    slug: string;
    item_id: string;
    resorts: string;
    gear_for_rent: string;
    email_address: string;
    profile_picture: string;
    resort_description: string;
    phone_number: string;
    resort_website: string;
    social_media_link: string;
    reason_signed_up: string;
    resort_address: string;
    lat: number;
    long: number;
    regions: string;
}