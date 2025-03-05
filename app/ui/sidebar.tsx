import './sidebar.css';
import { Resorts, Rentals, Repairs } from '@/app/definitions/mapboxDefinitions';
//import ResortInfo from './sidebar/resortInfo';
import Image from "next/image";

export default function Sidebar(
    {
        show, 
        closeNav, 
        content
    } : 
    {
        show: boolean, 
        closeNav: () => void, 
        content: Resorts | Rentals | Repairs | undefined
    }
) {

    const showSidebar = {
        width: show ? '25vw' : '0px',
        padding: show ? '10px' : '0px'
    }   

    //this takes the database headings from type 'like_this' to 'Like This'
    function titleize(slug: string) {
        const words = slug.split("_");
        return words.map(function(word) {
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        }).join(' ');
      }

      
    let image: string = ""
    if (content){
        if (content.image_url){
            console.log(`console logs image url: ${content.image_url}`)
            image = content.image_url;
        }        
    }
    console.log(image)
    console.log(content)

      //assigns an initial value for key, which is then incremented below to give a unique value for each rendered item
      let incrementedKey: number = 0;

      //list of database data not to render
      const doNotRender: string[] = ['slug', 'item_id'];
      
    return (        
        <div id="mySidenav" className="sidenav p-4" style={showSidebar}>
          
          <button onClick={closeNav} style={{color: 'black'}}>X</button>
          {/*The logic below first of all checks to see if there is data to render. If there is, it will receive
             an object of data for either a resort, rental shop or repair shop. For each database column heading,
             (eg: total_score), it renders the column heading as a sub-title (using titleize function above) and 
             then renders the corresponding information just below that. The only exception is if the data is itself
             a nested object, in which case that object is parsed using the same logic.
             There are some exceptions, listed in the doNotRender variable above and currently including 'slug' and 'item_id'
             (the latter of which should be kept confidential), which are not rendered.
             Also not rendered are any null entries (eg: if there is nothing listed for "Total Score", neither the
             "Total Score" heading nor the blank entry will render) or if the database table column heading includes 
             "picture", in which case that should be rendered as a picture and is not rendered as text
          */}
          
          { image ? 
            <Image 
              src={`/${image}`}
              alt={""}
              width='100'
              height='80'
              className='w-full'
            />        
          :
          null
          } 
          {/**<Image 
              src={`/cabin-ski-hire-glenshee.jpg`}
              alt={""}
              width='100'
              height='100'
            />  */}
          { content !== undefined ?
          Object.entries(content).map(([key, value])=> {
            if (value instanceof Object){
                return (
                    <div>
                        {Object.entries(value).map(([subkey, subvalue]) => {
                        console.log(subkey, subvalue)
                        return (
                            <div className="info-point py-4 mt-1 border-t" key={incrementedKey = incrementedKey + 1}>
                            <h2>{titleize(subkey)}</h2>
                            <p className="mt-0.5">{subvalue}</p>
                        </div>
                        )
                        })}
                    </div>
                )
            } else if (value && (!doNotRender.includes(key)) && (!key.includes('picture'))){
            return (<div className="info-point py-4 mt-1 border-t" key={incrementedKey = incrementedKey + 1}>
                <h2>{titleize(key)}</h2>
                <p className="mt-0.5">{value}</p>
            </div>)}
          })
          : null}
          
        </div>        
    )

}