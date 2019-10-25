import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, Form, Icon, Alert } from "antd";
import axios from "axios";

const CategoryDrawer = props => {
  const [submitValue, setSubmitValue] = useState({ category_name: "" });
  const [response, setResponse] = useState({
    status: "",
    msg: "",
    loading: false
  });

  useEffect(() => {
    if(props.type === "update") setSubmitValue({id: props.data.id,category_name: props.data.name})
  }, [props])

  const handleChange = inputName => event => {
    setSubmitValue({ ...submitValue, [inputName]: event.target.value });
  };

  const addCategory = event => {
    event.preventDefault();

    setResponse({ ...response, loading: true });
    const headers = {
      "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
    };
    axios
      .post("http://192.168.6.139:2020/category", submitValue, { headers })
      .then(result => {
        setResponse({
          status: result.data.status,
          message: result.data.result || result.data.message,
          loading: false
        });
        props.onProcessSuccess()
      })
      .catch(err => {
        setResponse({
          status: 400,
          message: "Connection lost :(",
          loading: false
        });
        console.log(err);
      });
  };

  const editCategory = event => {
    event.preventDefault();

    setResponse({ ...response, loading: true });
    const headers = {
      "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
    };
    axios
      .put(`http://192.168.6.139:2020/category/${submitValue.id}`, submitValue, { headers })
      .then(result => {
        setResponse({
          status: result.data.status,
          message: result.data.result || result.data.message,
          loading: false
        });
        props.onProcessSuccess()
      })
      .catch(err => {
        setResponse({
          status: 400,
          message: "Connection lost :(",
          loading: false
        });
        console.log(err);
      });
  };

  return (
    <Drawer
      height="50vh"
      title={props.title}
      placement="bottom"
      closable={true}
      onClose={props.updateVisible}
      visible={props.visible}
    >
      {response.status === 400 ? (
        <Alert
          message="Failed :("
          description={response.message}
          type="error"
          showIcon
          style={{ width: "100%", marginBottom: "15px" }}
        />
      ) : (
        ""
      )}
      {response.status === 200 ? (
        <Alert
          message="Success :)"
          description={response.message}
          type="success"
          showIcon
          style={{ width: "100%", marginBottom: "15px" }}
        />
      ) : (
        ""
      )}
      <Form
        className="login-form"
        onSubmit={props.type === "add" ? addCategory : editCategory}
        style={{ overflow: "auto" }}
      >
        <span className="title-h4">Category Name</span>
        <br/>
        <Input
          style={{ marginBottom: "15px" }}
          prefix={<Icon type="dropbox" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Category Name"
          onChange={handleChange("category_name")}
          value={submitValue.category_name}
          size="large"
        />
        <Button
          style={{ marginTop: "15px" }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={response.loading}
          size="large"
        >
          Add Category
        </Button>
      </Form>
    </Drawer>
  );
};

export default CategoryDrawer;
