import './css/App.css';
import { useState } from 'react';
import UserIcon from './image/svg/person.png';
import Title from './image/logo/Uphasia.png';
import { Link, useNavigate } from "react-router-dom";
import AlertBox from './component/AlertBox'
import sentPNG from './image/svg/sent.png'

function Cueing() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("/option1");
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  const [occupation, setOccupation] = useState('ทหาร');
  const [numOfWords, setNumOfWords] = useState(2);
  const [responseData, setResponseData] = useState(null);

  const handleMode = (USERMode) => {
    setMode(USERMode);
  };

  const block = () => {
    setAlertVisible(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:12000/gen_question', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: 3,
          target_word: occupation,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <div className="App">
      <div className="static-bar">
        <div className="left-content">
          <Link to="/Naming">
            <img className="title-image" src={Title} alt="Title" onClick={() => navigate('/Naming')} />
          </Link>
        </div>
        <div className="Middle-content">
          <h1>Semantic Cueing</h1>
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
          <div className='etcBoard3'></div>
          <div className='etcBoard4'>
            <form onSubmit={handleSubmit}>
     
              <p>
                Target Word:
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </p>
       
              
              <img
                src={sentPNG}
                alt="Send"
                className="SubmitIcon"
                onClick={handleSubmit} // Trigger API send
              />
            </form>
            {responseData && (
              <div>
                <h2>Response Data:</h2>
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="modetab">
          <div className='ModeHeading'>
            <h1>Log</h1>
            <textarea>hah</textarea>
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

export default Cueing;
