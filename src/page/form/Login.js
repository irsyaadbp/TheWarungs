import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Row, Col, Alert } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../../style.css";

const Login = () => {
  const initialFormState = { username: "", password: "" };
  const [input, setInput] = useState(initialFormState);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const isRedirect = setTimeout(() => {
      if (localStorage.getItem("jwt") !== null) return setRedirect(true);
      else return setRedirect(false);
    }, 2000);

    return () => {
      clearTimeout(isRedirect);
    };
  }, [redirect]);

  if(redirect) return <Redirect to="/dashboard" />;

  function authenticate(dataUser) {
    if (typeof window !== undefined) {
      localStorage.setItem("jwt", JSON.stringify(dataUser));
      setRedirect(true);      
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://192.168.6.139:2020/user/login", input)
      .then(result => {
        console.log(result.data, "result");

        if (result.data.status === 400) setResponse(result.data);
        if (result.data.status === 200) {
          setResponse({
            status: result.data.status,
            message:
              "Please wait a moment, you will be redirect in a few seconds"
          });
          authenticate(result.data.result);
        }
        setLoading(false);
      })
      .catch(err => {
        setResponse({ status: 400, message: "Connection lost :(" });
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = inputName => event => {
    setInput({ ...input, [inputName]: event.target.value });
  };
  
  return (
    <div id="login">
      <Row style={{ height: "100vh", position: "relative" }} type="flex">
        <Col lg={{ span: 17 }} xs={{ span: 0 }} className="bg-image"></Col>
        <Col
          lg={{ span: 7 }}
          xs={{ span: 24 }}
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
        >
          <Row style={{ height: "40vh" }} type="flex" align="middle">
            <div className="title-container">
              <p className="title">The Warungs</p>
              <p className="tagline">The Best Solution For Your Restaurant</p>
            </div>
            {response.status === 400 ? (
              <Alert
                message="Error Login"
                description={response.message}
                type="error"
                showIcon
                style={{ width: "100%" }}
              />
            ) : (
              ""
            )}

            {response.status === 200 ? (
              <Alert
                message="Success Login"
                description={response.message}
                type="success"
                showIcon
                style={{ width: "100%" }}
              />
            ) : (
              ""
            )}
          </Row>
          <Row style={{ height: "60vh" }} type="flex">
            <Form className="login-form" onSubmit={handleSubmit}>
              <p className="title-h2">Login first</p>
              <Input
                style={{ marginBottom: "20px" }}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                onChange={handleChange("username")}
                value={input.username}
                size="large"
              />
              <Input.Password
                style={{ marginBottom: "20px" }}
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                value={input.password}
                size="large"
              />
              <Button
                style={{ marginBottom: "15px" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                size="large"
              >
                Log in
              </Button>
              Don't have an account? <Link to="/register">register now!</Link>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
