import './css/App.css';
import { useNavigate} from "react-router-dom";
import UserIcon from './image/svg/person.png';
import Title from './image/logo/Uphasia.png';
import { Link } from "react-router-dom";



function Naming() {
    const navigate = useNavigate();
 


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
       <h2>Sematic Cueing and Features Analysis</h2>
      </div>
     <div className='right-content'>

      <div className="ProfileBox">
        <img src={UserIcon} alt="UGBN" className="UserIcon" />
        <h1 className="ProfileText">เด่นชัย ดัยเช่น</h1>
      </div>
     </div>

    </div>

       <div className="Dashboard">
       
         <div className="modetab2" onClick={() => navigate('/Cueing')}>
          <h1> Sematic Cueing</h1>
         </div>
         <div className="modetab2" onClick={() => navigate('/SFA')} >
          <h1>Sematic Feature Analysis</h1>
         </div>

       </div>
     </div>
   );
  }

  
export default Naming;

