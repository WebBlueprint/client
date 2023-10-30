import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

function GoogleLogin() {

    const [user, setUser] = useState({})

    function handleCallbackResponse(response) {
        //       console.log("Encoded JWT ID token: " + response.credential)
        var userObj = jwtDecode(response.credential)
        console.log(userObj)
        setUser(userObj)
        window.location.href = "/";
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