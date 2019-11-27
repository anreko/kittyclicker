import React, { useState, useEffect, useContext } from 'react';



function catComponent(props) {
    function updateCat() {
        if (props.info.cost < props.fishes) {
            let currentID = props.info._id;
            let whichCat = props.id;
            console.log(currentID, whichCat);
            fetch('/updateCat', {
                method: 'POST',
                body: JSON.stringify({currentID, whichCat}),
                headers: {'Content-Type': 'application/json'}
                })
            .then(response => response.json())
            .then(response => {
                let kittyInfo = {};
                for (let x = 0; x < response.catInfo.length; x++){
                    kittyInfo[response.catInfo[x]._id] = response.catInfo[x]
                }
                let catIDs = [];
                let perSec = 0;
                for (let i = 1; i < 5; i++) {
                    let id = response.userInfo['cat_'+i];
                    let obj = kittyInfo[id];
                    perSec += parseInt(kittyInfo[id].fish);
                    catIDs.push(obj);
                }
                props.setCats(catIDs);
                props.setFps(perSec);
                props.setFishes(props.fishes - props.info.cost);
            })
        }
        else {console.log('Not enough fishes!')}
    }

    return (
        <div className="catComponent" onClick={() => updateCat()}>
            <img src={props.info.img} height="100" className="catImg"/>
            <div className="catInfo">
                <h4 className="catName">{props.info.name}</h4>
                <h4 className="upgradeCost">{props.info.cost}<span className="fas fa-fish"></span></h4>
            </div>
        </div>
    )    
}


export default catComponent;