import React, { useState, useEffect, useContext } from 'react';
//import context from globalState

function fishesDisplay(props) {
    // const [fishes] = useContext(FpsContext);
    // console.log("FISHES DISPLAY:", props);
    return (
        <div id="fishes">
            <h1 id="totalFish">{props.fishes}<span className="fas fa-fish"></span></h1>
            <p id="fishPerSec">{props.fps} per second</p>
        </div>
    )    
}



export default fishesDisplay;