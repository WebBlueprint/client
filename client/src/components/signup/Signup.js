import React, { useState, useContext } from "react";
import { AuthContext } from "../application/store/AuthContext"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import golfimage from "../../svgs/golfimage.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import GoogleLogin from "../application/GoogleLogin";

// 컨테이너에 백그란운드 + 컨텐츠 두개 들어가고, 백그라운드를 4 컨테이너 6으로 놓고. 백그라운드에 꾸며주면 됨
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
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ispro, setIsPro] = useState(false);
  const [error, setError] = useState(""); // Add state for displaying a single error message
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }


  const Register = async (event) => {
    event.preventDefault();
    setError("")

    // 최소4글자, 영문, 숫자 포함 regex
    if (validatePassword(password) && password === confirmPassword) {
      const userData = {
        username,
        email,
        password,
        confirmPassword,
      };

      try {
        let result;
        if (ispro) {
          result = await axios.post("http://localhost:3000/signup", userData);
          console.log(result.data.message); // 여기에 추가
          navigate("/")
        } else {
          result = await axios.post("http://localhost:3000/signup", userData);
          console.log(result.data.message); // 여기에 추가
          navigate("/")
        }
        console.log(result.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      if (!validatePassword(password) || password !== confirmPassword) {
        setError("Please check your input fields."); // Set a generic error message
      }
    }
  };


  return (
    <>
      <Container fluid>
        <GlobalStyle />
        <Row>
          <Col xl={4} className="fill_bg">
            <Background>
              <Background_Content>
                <p
                  style={{
                    color: "#A4A3A3",
                    fontSize: "20px",
                    fontWeight: "200",
                  }}
                >
                  welcome
                </p>
                <h2 style={{ color: "white", fontSize: "40px" }}>Sign Up</h2>
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
                    width: "50%",
                    borderRadius: "18px",
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
                    width: "50%",
                    borderRadius: "18px",
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
                    borderRadius: "18px",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3 place_holder"
                  style={{
                    backgroundColor: "#F3F3F3",
                    height: "50px",
                    borderRadius: "18px",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); setError(""); }}
                  className="mb-3 place_holder"
                  style={{
                    backgroundColor: "#F3F3F3",
                    height: "50px",
                    borderRadius: "18px",
                  }}
                />
             
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {setConfirmPassword(e.target.value); setError("");}}
                  className="mb-3 place_holder"
                  style={{
                    backgroundColor: "#F3F3F3",
                    height: "50px",
                    borderRadius: "18px",
                  }}
                />
              </Form.Group>
              {error && (
            <p style={{ color: "red", fontSize: "14px", textAlign: "center", margin: "10px 0" }}>
              {error}
            </p>
          )}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="success"
                  onClick={Register}
                  style={{
                    width: "80%",
                    height: "45px",
                    backgroundColor: "#1B4607",
                  }}
                >
                  Sign Up
                </Button>
              </div>
       
              <br />
              <GoogleLogin />
              Already have an account? <Link to="/signin">Sign in</Link>
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
