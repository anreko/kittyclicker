import React, { useState, useEffect, useContext } from 'react';


function fishesDisplay() {
    const { fishes, fps } = useContext(FpsContext);

    return (
        <div>Fishes: {fishes}</div>
    )    
}



export default fishesDisplay;