import React, { useState, useEffect, useContext } from 'react';



function catComponent(props) {
    function updateCat() {
        let currentID = props.info._id;
        let id = props.id;
        console.log(currentID, id);
        fetch('/updateCat', {
            method: 'POST',
            body: JSON.stringify({currentID, id}),
            headers: {'Content-Type': 'application/json'}
            })
        // .then(response => response.json())
        // .then(response => console.log(response))
    }


    return (
        <div className="catComponent" onClick={() => updateCat()}>
            <h4>{props.info.name}</h4>
            <img src={props.info.img}/>
        </div>
    )    
}


export default catComponent;