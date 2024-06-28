
import './css/App.css';
import { useState/*, useEffect*/ } from 'react';
/*import { useLocation } from 'react-router-dom';
import { db } from './Firebase';
import {  collection, getDocs, doc, getDoc } from 'firebase/firestore';
import HomeIcon from './image/svg/Home.png';*/
import UphasiaMockup from './image/Data/UphasiaMock.png'
import UserIcon from './image/svg/person.png';
import Title from './image/logo/Uphasia.png';
import { Link,useNavigate} from "react-router-dom";
import AlertBox from './component/AlertBox'

function SFA() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("/option1");
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  //const [alertTopic, setAlertTopic] = useState('Mode Return Null'); // State to manage alert topic
  //const [alertContent, setAlertContent] = useState('Node Has no component'); // State to manage alert content



  
  const handleMode = (USERMode) => {
    setMode(USERMode);
  };
  const block = () => {
    setAlertVisible(true)
  }

    return (
       /* STATIC BAR */
       <div className="App">
       <div className="static-bar">
       <div className="left-content">

       <Link to="/Naming">
           <img className="title-image" src={Title} alt="Title"  onClick={() => navigate('/Naming')} />
        </Link>
       </div>

       <div className="Middle-content">
        <h1>Sematic Cueing</h1>
       </div>
      <div className='right-content'>

       <div className="ProfileBox" onClick={() => block()}>
         <img src={UserIcon} alt="UGBN" className="UserIcon" />
         <h1 className="ProfileText">เด่นชัย ดัยเช่น</h1> 
       </div>
      </div>

     </div>

        <div className="Dashboard">
     
                <div className='etcBoard2'>
                    
                    <div className='etcBoard3'>
                        
                    </div>
                    <div className='etcBoard4'>
                        
                    </div>
            
                </div>
          <div className="modetab">

            <div className='ModeHeading'>
            <h1>Log</h1>
            </div>
          
            
        
       
          </div>
        </div>
        {alertVisible && (
        <AlertBox
          alertTopic={'Mode Return Null'}
          alertContent={'Node Has no component'}
          onClose={() => setAlertVisible(false)} // Close the alert
        />
      )}
      </div>
    );
  }

  
export default SFA;

