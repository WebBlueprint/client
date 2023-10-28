import React, { useState } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import golfimage from "../images/golfimage.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { Form, Col, Row, Container, Button } from "react-bootstrap";


//사인인은 라우터 환겨변수 밸류 나오면 확인하자.

const Background = styled.div`
  background-color: #1b4607;
  display: flex;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle` // 배경꽉채우기
  body{
    padding: 0;
    margin: 0;
  }
`;

const Background_Content = styled.div`
  position: relative;
  width: 80%;
  left: 150px;
  height: 75vh;
  top: 180px;
  font-family: "DM Sans";
  font-weight: 700;
`;

const Golf_image = styled.img`
  position: relative;
  width: 80%;
  left: 120px;
`;

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ispro, setIsPro] = useState(false);

    const Register = async (event) => {
        event.preventDefault();
        const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
        // 최소4글자, 영문, 숫자 포함 regex
        if (regex.test(password)) {
            console.log("Your password is validated");

            const userData = {
                username,
                password,
                ispro
            };

            try {
                let result;
                if (ispro) {
                    result = await axios.post(
                        "http://localhost:3000/login",
                        userData
                    );
                    alert(result.data.message);  // 여기에 추가
                    window.location.href = "/";
                } else {
                    result = await axios.post(
                        "http://localhost:3000/login",
                        userData
                    );
                    alert(result.data.message);  // 여기에 추가
                    window.location.href = "/";
                }

                console.log(result.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            if (!regex.test(password)) {
                alert(
                    "Your password should have more than 4 letters including alphabet and number."
                );
            } else {
                alert("Password does not match.");
            }
        }
    };

    return (
        <Container fluid>
            <GlobalStyle />
            <Row>
                <Col xl={4}>
                    <Background>
                        <Background_Content>
                            <p
                                style={{
                                    color: "#A4A3A3",
                                    fontSize: "20px",
                                    fontWeight: "200"
                                }}
                            >
                                welcome
                            </p>
                            <h2 style={{ color: "white", fontSize: "40px" }}>Sign In</h2>
                            <Golf_image src={golfimage} />
                        </Background_Content>
                    </Background>
                </Col>
                <Col
                    xl={8}
                    className="d-flex align-items-center justify-content-center"
                >
                    <Form style={{ width: "40%" }}>
                        <Form.Group className="d-flex justify-content-between mb-3">
                            <Form.Control
                                type="button"
                                value="User"
                                label="User"
                                name="isPro"
                                id="user"
                                onClick={() => setIsPro(false)}
                                inline="true"
                                className={!ispro ? "mr-3 isProButton_clicks" : "mr-3"}
                                style={{
                                    backgroundColor: "#F3F3F3",
                                    height: "60px",
                                    width: "240px",
                                    borderRadius: "18px"
                                }}
                            />
                            <Form.Control
                                type="button"
                                label="Pro"
                                value="Pro"
                                name="isPro"
                                id="pro"
                                className={ispro ? "isProButton_clicks" : ""}
                                onClick={() => setIsPro(true)}
                                inline="true"
                                style={{
                                    backgroundColor: "#F3F3F3",
                                    height: "60px",
                                    width: "240px",
                                    borderRadius: "18px"
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mb-3 place_holder"
                                style={{
                                    backgroundColor: "#F3F3F3",
                                    height: "50px",
                                    borderRadius: "18px"
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-3 place_holder"
                                style={{
                                    backgroundColor: "#F3F3F3",
                                    height: "50px",
                                    borderRadius: "18px"
                                }}
                            />
                        </Form.Group>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="success"
                                onClick={Register}
                                style={{
                                    width: "80%",
                                    height: "45px",
                                    backgroundColor: "#1B4607"
                                }}
                            >
                                Sign In
                            </Button>
                        </div>
                        <br />
                        Forgot Password? <a href="/signup">Sign Up</a>
                        <br />
                        Icons
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
