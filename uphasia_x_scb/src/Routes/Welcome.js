
import './css/App.css';
import Title from './image/logo/Uphasia.png';
import { useNavigate} from "react-router-dom";


function Welcome() {
  const navigate = useNavigate();





  

    return (
       /* STATIC BAR */
       <div className="App">
       <div className="welcome-container">
     
      <img src={Title} alt="Welcome" className='UphasiaMiddleLogo'/>

      <div className="LogRegContainer">
        <button className='LogRegbox1' onClick={() => navigate('/Home')}>Login</button>
        <button className='LogRegbox2' onClick={() => navigate('/Register')}>Register</button>
      </div>
     

     </div>

        

      </div>
    );
  }

  
export default Welcome;

