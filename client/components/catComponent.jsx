import React, { useState, useEffect, useContext } from 'react';

function catComponent(props) {
    return (
        <div className="catComponent">
            <h4>{props.info.name}</h4>
            <img src={props.info.img}/>
        </div>
    )    
}


export default catComponent;