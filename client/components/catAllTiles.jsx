import React, { useState, useEffect, useContext } from 'react';
import CatComponent from './catComponent.jsx';


function catComponent(props) {
    let arrOfCats = [];
    for (let i = 0; i < props.cats.length; i++){
        arrOfCats.push(<CatComponent info={props.cats[i]}/>);
    }

    return (
        <div className="catTiles">
            {arrOfCats};
        </div>
    )    
}



export default catComponent;