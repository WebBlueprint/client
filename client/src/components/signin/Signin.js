import React, { useState, useContext } from "react";
import { AuthContext } from "../application/store/AuthContext"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import golfimage from "../../svgs/golfimage.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signup/Signup.css";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import GoogleLogin from "../application/GoogleLogin";

//사인인은 라우터 환경변수 밸류 나오면 확인하자.

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

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ispro, setIsPro] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // Add state for password error
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

  const setTokenToCookie = (token) => {
    document.cookie = `token=${token}; path=/;`;
  };

  const Login = async (event) => {
    event.preventDefault();
    setLoading(true);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    // 최소6글자, 영문, 숫자 포함 regex
    if (validatePassword(password)) {
      const userData = {
        username,
        password,
        ispro,
      };

      try {
        let result;
        if (ispro) {
          result = await axios.post("http://localhost:3000/login", userData, {
            withCredentials: true, // 쿠키를 전송하기 위해 withCredentials 옵션을 추가
          });
          // login()
          console.log(result.data.message); // 여기에 추가
          navigate("/")
        } else {
          result = await axios.post("http://localhost:3000/login", userData, {
            withCredentials: true, // 쿠키를 전송하기 위해 withCredentials 옵션을 추가
          });
          // login()
          console.log(result.data.message); // 여기에 추가
          navigate("/")
        }

        const token = result.data.token;
        setTokenToCookie(token); // 쿠키에 토큰 저장
        console.log("로그인 성공");
        navigate("/");

      } catch (error) {
        alert(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      setPasswordError("Your password should have more than 4 letters including alphabet and number.");
    }
  };

  return (
    <>
      <Container fluid>
        <GlobalStyle />
        <Row>
          <Col xl={4} className="fill_bg" >
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
              <Form.Group className="d-flex mb-3">
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(""); // Clear the password error message when input changes
                  }}
                  className="mb-3 place_holder"
                  style={{
                    backgroundColor: "#F3F3F3",
                    height: "50px",
                    borderRadius: "18px",
                  }}
                />
                {passwordError && (
                  <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
                )}
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="success"
                  onClick={Login}
                  style={{
                    width: "80%",
                    height: "45px",
                    backgroundColor: "#1B4607",
                  }}
                >
                  Sign In
                </Button>
              </div>
              <br />
              <GoogleLogin />
              Forgot Password? <Link to="/signup">Sign Up</Link>
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signin;
