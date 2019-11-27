import React, { useState, useEffect, useContext } from 'react';
import CatComponent from './catComponent.jsx';


function catComponent(props) {
    let arrOfCats = [];
    for (let i = 0; i < props.cats.length; i++){
        arrOfCats.push(<CatComponent key={i} id={i} info={props.cats[i]} setCats={props.setCats} setFps={props.setFps} fishes={props.fishes} setFishes={props.setFishes}/>);
    }

    return (
        <div className="catTiles">
            {arrOfCats}
        </div>
    )    
}



export default catComponent;