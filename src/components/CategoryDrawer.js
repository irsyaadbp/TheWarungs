import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, Form, Icon, notification } from "antd";
import axios from "axios";

const CategoryDrawer = props => {
  const [loading, setLoading] = useState(false);
  const [submitValue, setSubmitValue] = useState({ id: "",category_name: "" });
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

    setLoading(true);
    const headers = {
      "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
    };
    axios
      .post("http://192.168.6.139:2020/category", submitValue, { headers })
      .then(result => {
        setLoading(false);
        
        if (result.data.status === 200) {
          notification.success({
            message: "Success Add Category",
            description: `Success Edited Product ${submitValue.prod_name}.`
          });
          props.onProcessSuccess()
        } else {
          notification.error({
            message: "Failed Add Category",
            description: result.data.message
          });
        }
      })
      .catch(err => {
        setLoading(false);
        notification.error({
          message: "Failed Add Category",
          description: "Connection lost :("
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

        if (result.data.status === 200) {
          notification.success({
            message: "Success Edited Category",
            description: `Success Edited Category ${submitValue.category_name}.`
          });
          props.onProcessSuccess()
        } else {
          notification.error({
            message: "Failed Edit Category",
            description: result.data.message
          });
        }
      })
      .catch(err => {
        notification.error({
          message: "Failed Edit Product",
          description: "Connection lostasdasd :("
        });
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
          loading={loading}
          size="large"
        >
          Add Category
        </Button>
      </Form>
    </Drawer>
  );
};

export default CategoryDrawer;