import './sidebar.css';

export default function Sidebar({show, closeNav}: {show: boolean, closeNav: any}) {

    //const closeNav = () => {
       // console.log('closeNav called');
    //}

    const showSidebar = {
        width: show ? '250px' : '0px'
    }

    

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