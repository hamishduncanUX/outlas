import './sidebar.css';
import { Resorts, Rentals, Repairs } from '@/app/definitions/mapboxDefinitions';

export default function Sidebar(
    {
        show, 
        closeNav, 
        content
    } : 
    {
        show: boolean, 
        closeNav: any, 
        content: Resorts | Rentals | Repairs | undefined
    }
) {

    //const closeNav = () => {
       // console.log('closeNav called');
    //}

    const showSidebar = {
        width: show ? '250px' : '0px'
    }

    console.log('content')
    console.log(content);

    return (        
        <div id="mySidenav" className="sidenav" style={showSidebar}>
          {/*<a href="javascript:void(0)" className="closebtn" onClick={closeNav()}>&times;</a>*/}
          <button onClick={closeNav} style={{color: 'white'}}>X</button>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>        
    )

}