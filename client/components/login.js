import React, { useState, useEffect } from 'react';

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errDisplay, setErrDisplay] = useState("hidden")


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
            else setErrDisplay("loginErr");
        })

    }


    return (
        <div className="main centered">
            <h1>Kitty Clicker</h1>
            <h2>Log In</h2>
            <p id={errDisplay}>Incorrect Username or Password</p>
            <div id="loginForm">
                <div id="username">
                    <label htmlFor="username">Username</label><br />
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div id="password">
                    <label htmlFor="username">Password</label><br />
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)}></input>
                </div>
            </div>
            <button id="loginBtn" onClick={()=>{checkLogin()}}>Log In<span className="fas fa-paw"></span></button>
        </div>
      )
}

export default Login;