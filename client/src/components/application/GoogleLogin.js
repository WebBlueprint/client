import React, { useEffect, useState, useContext } from 'react'
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../application/store/AuthContext"
import { useNavigate } from 'react-router-dom'


function GoogleLogin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const { isLoggedIn, login, logout } = useContext(AuthContext);
    function handleCallbackResponse(response) {
        //       console.log("Encoded JWT ID token: " + response.credential)
        var userObj = jwtDecode(response.credential)
        console.log(userObj)
        setUser(userObj)
        login()
        navigate("/")
    }


    useEffect(() => {
        const google = window.google
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
    }, [])


    return (
        <div id="signInDiv">login with google</div>
    )
}

export default GoogleLogin