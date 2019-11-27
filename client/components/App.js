import React, { useState, useEffect } from 'react';
import Game from './game.js';
import Login from './login.js';

function App() {
  const [pageDisplay, setDisplay] = useState(<p>LOADING</p>);
  const [logged, setLogged] = useState(false);


  useEffect(() => {
    if (logged) {
      setDisplay(<Game />);
      // console.log('Logged in', displayScreen);
    }
    else {
      setDisplay(<Login setLogged={setLogged}/>);
      // console.log('Not logged in', displayScreen);
    }
  },[logged])

  return (
    <div className="centered">
      {pageDisplay}
    </div>
  )
}

export default App;