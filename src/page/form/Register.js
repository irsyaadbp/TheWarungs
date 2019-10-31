import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Row, Col, Alert } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../../style.css";

const Register = () => {
  const initialFormState = { username: "", password: "", user_role: "" };
  const [input, setInput] = useState(initialFormState);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) setRedirect(true);
    else setRedirect(false);
  }, []);

  if (redirect) return <Redirect to="/dashboard" />;

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/register`, input)
      .then(response => {
        setLoading(false);
        if (response.data.status === 200) clearForm();
        setResponse(response.data);
      })
      .catch(err => {
        setResponse({status: 400, message: "Connection lost :("});
        setLoading(false);
      });
  };

  const clearForm = () => {
    setInput(initialFormState);
  };

  const handleChange = nameName => event => {
    setInput({ ...input, [nameName]: event.target.value });
  };

  return (
    <div id="register">
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
                message="Error Register"
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
                message="Success Register"
                description={response.result}
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
              <p className="title-h2">Register here</p>
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
              <Input
                style={{ marginBottom: "20px" }}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder="Role"
                onChange={handleChange("user_role")}
                value={input.user_role}
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
                Register
              </Button>
              Already have an account? <Link to="/">Login now!</Link>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
