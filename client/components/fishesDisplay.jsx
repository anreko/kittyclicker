import React, { useState, useEffect, useContext } from 'react';
//import context from globalState

function fishesDisplay(props) {
    // const [fishes] = useContext(FpsContext);
    // console.log("FISHES DISPLAY:", props);
    return (
        <div>
            <h2>Fishes: {props.fishes}</h2>
            <p>{props.fps} per second</p>
        </div>
    )    
}



export default fishesDisplay;