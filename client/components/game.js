import React, { useState, useEffect } from 'react';
import FishesDisplay from './fishesDisplay.jsx';
import CatAllTiles from './catAllTiles.jsx';

function Game() {
    //set state
    const [user, setUser] = useState([]);
    const [fishes, setFishes] = useState(0);
    const [cats, setCats] = useState([])
    const [fps, setFps] = useState(0);
  
  
    //runs once on load to get game data
    useEffect(() => {
      fetch('/data')
      //returns an object with userInfo object and catInfo array
      //TODO Modify query so it doesn't return user password or cat cost.
      //catInfo array contains cat objects by ID
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUser([data.userInfo.username]);
          setFishes([parseInt(data.userInfo.fishes)])
          //push user's cat IDs into cats state
          let kittyInfo = {};
          for (let x = 0; x < data.catInfo.length; x++){
            kittyInfo[data.catInfo[x]._id] = data.catInfo[x]
          }
          console.log("CAT INFO?:", kittyInfo);
          let catIDs = [];
          let perSec = 0;
          for (let i = 1; i < 5; i++){
            // console.log(data.userInfo['cat_'+i])
            let id = data.userInfo['cat_'+i];
            let obj = kittyInfo[id];
            perSec += parseInt(kittyInfo[id].fish);
            catIDs.push(obj);
          }
          console.log("CATS BY ID:", catIDs);
          setCats(catIDs)
          setFps(perSec);
        })
    }, []);
  
      useEffect(() => {
        const fishesLoop = setInterval(() => {setFishes(parseInt(fishes) + (parseInt(fps)))}, 1000)
        return function cleanup() {
          clearInterval(fishesLoop)
        }
      },[fishes])
  
      function save(){
        console.log('Trying to save fishes:', fishes);
        fetch('/saveData', {
          method: 'POST',
          body: JSON.stringify({fishes}),
          headers: {'Content-Type': 'application/json'}
          })
      .then(response => response.json())
      .then(response => console.log(response))
      }
  
    return (
      <div id="gameScreen">
        <div id="title">
          <h2>Kitty Clicker</h2>
          <button id="saveBtn" onClick={() => save()}>save</button>
        </div>
        <div className="main">
          <FishesDisplay fishes={fishes} fps={fps} />
          <CatAllTiles cats={cats} setCats={setCats} setFps={setFps} fishes={fishes} setFishes={setFishes}/>
        </div>
      </div>
    )
  }
  
  export default Game;