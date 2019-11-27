import React, { useState, useEffect, useRef} from 'react';
import FishesDisplay from './fishesDisplay.jsx';
import CatAllTiles from './catAllTiles.jsx';
//import provider from globalState

function App() {
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
      let currentFish = parseInt(fishes);
      const fishesLoop = setInterval(() => {setFishes(parseInt(fishes) + (parseInt(fps) * 5))}, 5000)
      return function cleanup() {
        clearInterval(fishesLoop)
      }
    },[fishes])
  

  // TODO Cat Components should maybe live a level down
  // let arrOfCats = [];
  // for (let i = 0; i < cats.length; i++){
  //   arrOfCats.push(<CatComponent info={cats[i]}/>);
  // }

  return (
    <div>
      <h1>Kitty Clicker</h1>
      <h2>now with hooks!</h2>
      <h3>{user} has {fishes} fishes</h3>
      <h3>Earning {fps} per second</h3>
        <FishesDisplay fishes={fishes} fps={fps} />
        <CatAllTiles cats={cats} setCats={setCats}/>
    </div>
  )
}

export default App;