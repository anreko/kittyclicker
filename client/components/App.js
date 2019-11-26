import React, { useState, useEffect } from 'react';

function App() {
  const [fish, setFish] = useState(0);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('/data')
      .then(response => response.json())
      .then(user => {
        console.log('in use effect');
        setUser([user[0].username]);
        setFish([user[0].fishes])
      })
  }, []);

  return (
    <div>
      <h1>Kitty Clicker</h1>
      <h2>now with hooks!</h2>
      <h3>{fish}</h3>
      <p>{user}</p>
    </div>
  )
}

export default App;