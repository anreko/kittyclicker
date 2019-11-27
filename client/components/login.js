import React, { useState, useEffect } from 'react';

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function checkLogin(){     
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
            })
        .then(response => response.json())
        .then(response => {
            if (response === true){
                props.setLogged(true);
            }
            else console.log('Username/Pass does not exist');
        })

    }


    return (
        <div className="main centered">
            <h1>Log In</h1>
            <div id="username">
                <label htmlFor="username">Username</label><br />
                <input type="text" name="username" onChange={e => setUsername(e.target.value)}></input>
            </div>
            <div id="password">
                <label htmlFor="username">Password</label><br />
                <input type="password" name="password" onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button onClick={()=>{checkLogin()}}>Log In<span className="fas fa-paw"></span></button>
        </div>
      )
}

export default Login;