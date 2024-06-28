import React from 'react';
import { useState , useEffect } from 'react';


import Naming from './Naming';
import Rep from './Rep';
import Comprehension from './Comprehension';
import Speech from './Speech';


function ContentBoard( mode ) {

  const [ Currmode , setCurrmode] = useState(null);

  useEffect(() => {
    setCurrmode(mode); // Update CurrMode when mode changes
  }, [mode]);

  switch (Currmode) {
    case '/Home':
      return <>This is Home</>;
    case '/Naming':
      return <Naming  />;
    case '/Rep':
      return <Rep />;
    case '/Comprehension':
      return <Comprehension />;
    case '/Speech':
      return <Speech />;


    default:
      return null; // Render null for unknown modes
  }
}

export default ContentBoard;
