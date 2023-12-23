import React, { useEffect, useState, useContext } from 'react'
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../application/store/AuthContext"
import { useNavigate } from 'react-router-dom'
import Signin from "../signin/Signin"
import axios from "axios";



function GoogleLogin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const { isLoggedIn, login, logout } = useContext(AuthContext);

    function handleCallbackResponse(response) {
        //       console.log("Encoded JWT ID token: " + response.credential)
        var userObj = jwtDecode(response.credential)
        console.log(userObj)
        setUser(userObj)

        axios.post('http://localhost:3000/user', {
            email: userObj.email,
        }, {
            withCredentials: true,
        }).then(async (response) => {
            console.log(response.data);

            // 로그인 성공 시 받은 사용자 정보를 저장하고 페이지 이동
            const userData = response.data;
            await login(userData);
            navigate('/');

            console.log("로그인 성공");
        })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    if (window.location.href.includes("signin")) {
                        alert("회원가입페이지로 이동합니다")
                    }
                    navigate('/signup', { state: { userEmail: userObj.email } });
                } else {
                    // 그 외의 에러 처리
                    console.error('Error checking user:', error);
                }
            });

        // login()
        // navigate("/")
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