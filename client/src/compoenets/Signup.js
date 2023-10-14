import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [ispro, setIsPro] = useState(false)

    const Register = async (event) => {
        event.preventDefault();
        if (password === cpassword) {
            const userData = {
                username,
                email,
                password
            };

            try {
                let result;
                if (ispro) {
                    // result = await axios.get("http://localhost:3000/pro/signup");
                    result = await axios.post("http://localhost:3000/pro/signup", userData);
                } else {
                    result = await axios.post("http://localhost:3000/user/signup", userData);
                }

                console.log(result.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Password is not matching");
        }
    };

    // 민지님 sign up 디자인에는 username 적는 란이 없음
    // 여기엔 username 우선은 추가함.
    // 동민님이 유저인지 아닌지를 받아주는 조건을 APIs에 걸여줘야함
    // 모델내에 isAdmin 만드실 건지 - 어떻게?

    // 추가하기
    // 유저네임, 이메일, 패스워드 각 이미 존재하는지 추가하기
    // 비밀번호 잊었을 때 + remember me 추가하기
    // 각 SNS로그인 추가하기

    return (
        <div>
            <h1>Sign Up</h1>
            <form>
                <div>
                    <input name="isPro" type="radio" id="user" onChange={() => setIsPro(false)} />
                    <label htmlFor="user">User</label>
                    <input name="isPro" type="radio" id="pro" onChange={() => setIsPro(true)} />
                    <label htmlFor="pro">Pro</label>
                    {/* 라디오타입의 경우 name을 동일하게 하면 그 중 하나만 선택할 수 있게 됨 */}
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
                        placeholder="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
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
                    <input
                        placeholder="Concirm Password"
                        onChange={(e) => {
                            setCpassword(e.target.value);
                        }}
                        value={cpassword}
                    ></input>
                </div>

                <div>
                    <button onClick={Register}>Sign Up</button>
                    <br></br>
                    Already have an account?
                    <a href="/signin">Sign in</a>
                    <br></br>
                    icons
                </div>
            </form>
        </div>
    );
};

export default Signup;
