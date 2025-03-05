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
      image_url: string;
      opening_times: string;
      item_id: string;
      slug: string;
      status: string;
      lat: number;
      long: number;
}

export type Rentals = {
      name: string;
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
      image_url: string;

}

export type Resorts = {
      name: string,
      lat: number,
      long: number,
      altitude: string,
      total_score: number,
      sustainability_score: number,
      family_score: number,
      cost: {
            "Day Pass": string,
            "Season Pass": string
         },
      accessibility: number,
      female_friendly: number,
      lack_racism: number,
      lgbtq_friendly: number,
      lack_crime: number,      
      nearest_rail_station: string,
      nearest_charge_point: string,
      number_rental_stores: number,
      number_of_repair_stores: number,
      opening_times: string,
      region: string,
      item_id: string,
      slug: string,
      status: string,
      publish: string,
      price_index: string,
      currency: string,
      cover_image: string,
      image_url: string,
      featured_rental_store: string,
      other_rental_stores: string,
      featured_repair_store: string,
      other_repair_stores: string,
      internet_quality: string,
      snowfall_per_year: string,
      rated_by_outsiders: string,
      hospitals_medical_centres: string,
      places_to_work: string,
      sustainability_score_two: string,
      rentals_two: string,
      sustainability_score_copy: string
}
/*
export interface customEvent<T extends Event> = Event & {
      target: T;
      currentTarget: T;
      features: string[];
    }*/

    //export interface customEventTarget extends EventTarget {
      //features: string[];
    //}

    //interface KonvaTextEventTarget extends EventTarget {
      //index: number
    //}
    
    /*
    export interface customMouseEvent extends React.MouseEvent<HTMLElement> {
      //target: customEventTarget
      features: {
            properties: {
                  id: string;
            }
      }[]
    }*/