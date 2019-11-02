import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Row, Col, Alert } from "antd";
import { Link } from "react-router-dom";
import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/auth";

const Register = () => {
  const initialFormState = { username: "", password: "", user_role: "" };
  const [input, setInput] = useState(initialFormState);

  const { registerResponse, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (registerResponse.status === 200) clearForm();
  }, [registerResponse]);


  const handleSubmit = async event => {
    event.preventDefault();

    await dispatch(register(input));
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
            {registerResponse.status === 400 ? (
              <Alert
                message="Error Register"
                description={registerResponse.message}
                type="error"
                showIcon
                style={{ width: "100%" }}
              />
            ) : (
              ""
            )}

            {registerResponse.status === 200 ? (
              <Alert
                message="Success Register"
                description={registerResponse.result}
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
                loading={isLoading}
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
