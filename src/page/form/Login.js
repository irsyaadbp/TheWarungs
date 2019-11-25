import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Row, Col, Alert } from "antd";
import { Link, withRouter } from "react-router-dom";
// import axios from "axios";
import "../../style.css";

import { login, getUserDetail } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";

const Login = props => {
  const initialFormState = { username: "", password: "" };
  const [input, setInput] = useState(initialFormState);

  const { loginResponse, isLoading, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const isRedirect = setTimeout(() => {
      getUserToken();
    }, 0);

    return () => {
      clearTimeout(isRedirect);
    };
  }, [user, loginResponse]);

  const getUserToken = async () => {
    await dispatch(getUserDetail());
    if (user !== null) props.history.push("/dashboard");
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await dispatch(login(input));
  };

  const handleChange = inputName => event => {
    setInput({ ...input, [inputName]: event.target.value });
  };

  return (
    <div id="login">
      <Row className="row" type="flex">
        <Col lg={{ span: 17 }} xs={{ span: 0 }} className="bg-image"></Col>
        <Col lg={{ span: 7 }} xs={{ span: 24 }} className="login-container">
          <Row style={{ height: "40%" }} type="flex" align="middle">
            <div className="title-container">
              <p className="title">The Warungs</p>
              <p className="tagline">The Best Solution For Your Restaurant</p>
            </div>
            {loginResponse.status === 400 ? (
              <Alert
                message="Error Login"
                description={loginResponse.message}
                type="error"
                showIcon
                style={{ width: "100%" }}
              />
            ) : (
              ""
            )}

            {loginResponse.status === 200 ? (
              <Alert
                message="Success Login"
                description="Login successfully, please wait a moment you will be redirect"
                type="success"
                showIcon
                style={{ width: "100%" }}
              />
            ) : (
              ""
            )}
          </Row>
          <Row style={{ height: "60%" }} type="flex">
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
                loading={isLoading}
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

export default withRouter(Login);
