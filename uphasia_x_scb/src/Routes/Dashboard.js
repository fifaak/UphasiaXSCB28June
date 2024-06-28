import './css/App.css';

import UserIcon from './image/svg/person.png';
import Title from './image/logo/Uphasia.png';
import { Link } from "react-router-dom";

import Placeholder from './image/logo/Dashboard.png';

function Dashboard() {

 


    return (
      /* STATIC BAR */
      <div className="App">
      <div className="static-bar">
      <div className="left-content">

      <Link to="/Home">
          <img className="title-image" src={Title} alt="Title"   />
       </Link>
      </div>

      <div className="Middle-content">
       <h1>Profile Information</h1>
      </div>
     <div className='right-content'>

      <div className="ProfileBox">
        <img src={UserIcon} alt="UGBN" className="UserIcon" />
        <h1 className="ProfileText">Name EIEI</h1>
      </div>
     </div>

    </div>

       <div className="Dashboard">
         <div className='ProfileInfoTab'>
           <h1>SAI Diew</h1>
           <img src={Placeholder} alt="UGBN" className='Placeholder' />
           </div>
       </div>
     </div>
   );
  }

  
export default Dashboard;

