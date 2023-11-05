import React, { useState, useEffect } from "react";
import axios from "axios";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ispro, setIsPro] = useState(false)
    // 보내야할 유저 데이터 state 정리

    const Login = async (event) => {
        event.preventDefault();
        const userData = {
            username,
            password,
            ispro
        };
        // 유저 데이터 오브젝트 
        try {
            let result;
            if (ispro) {
                // result = await axios.get("http://localhost:3000/pro/signup");
                result = await axios.post("http://localhost:3000/pro/login", userData);
            } else {
                result = await axios.post("http://localhost:3000/user/login", userData);
            }
            // 프로 true -> pro 라우터로, 아니면 user라우터로.
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }

    };

    // 유저네임, 이메일, 패스워드 각 이미 존재하는지 여부 확인 -> 이건 몽고DB 접근권한 받아야 테스트 가능 
    // 비밀번호 잊었을 때 + remember me
    // 각 SNS로그인 - auth

    return (
        <div>
            <h1>Sign In</h1>
            <form>

                <div>
                    <input name="isPro" type="radio" id="user" onChange={() => setIsPro(false)} />
                    <label htmlFor="user">User</label>
                    <input name="isPro" type="radio" id="pro" onChange={() => setIsPro(true)} />
                    {/* onChange 에서 ()=> 없이 바로 setIsPro하면 너무 많은 render 요청으로 오류남. */}
                    <label htmlFor="pro">Pro</label>
                </div>
                <div>
                    <input
                        placeholder="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                    ></input>
                </div>
                <div>
                    <input
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                    ></input>
                </div>
                <div>
                    <button onClick={Login}>Sign In</button>
                    <br></br>
                    <a href="/passcheck">Forgot Password?</a>
                    <div>
                        New to Golfing?
                        <a href="/signup">Join Now</a>
                    </div>
                    <br></br>
                    icons
                </div>
            </form>
        </div>
    );
};

export default Signin;
