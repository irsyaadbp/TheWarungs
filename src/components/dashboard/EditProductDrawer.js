import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Input,
  Form,
  Icon,
  Select,
  Alert,
  InputNumber
} from "antd";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;

const EditProductDrawer = props => {
  const [response, setResponse] = useState({
    status: "",
    msg: "",
    loading: false
  });

  const [submitValue, setSubmitValue] = useState({
    prod_name: "",
    prod_desc: "",
    prod_image: "",
    category_id: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    setSubmitValue({
      prod_name: props.dataEdit.product_name,
      prod_desc: props.dataEdit.description,
      prod_image: props.dataEdit.image,
      category_id: props.dataEdit.category,
      price: props.dataEdit.price,
      quantity: props.dataEdit.quantity
    });
  }, [props.dataEdit]);


  const updateProduct = event => {
    event.preventDefault();
    console.log(submitValue, "update")

    setResponse({ ...response, loading: true });
    const headers = {
      "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
    };
    axios
      .put(`http://192.168.6.139:2020/product/${props.dataEdit.id}`, submitValue, { headers })
      .then(result => {
        console.log(result.data, "result");
        setResponse({
          status: result.data.status,
          message: result.data.result || result.data.message,
          loading: false
        });
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

  const handleChange = inputName => event => {
    setSubmitValue({ ...submitValue, [inputName]: event.target.value });
  };

  const onChangeInputNumber = inputName => value => {
    setSubmitValue({ ...submitValue, [inputName]: value});
  }

  return (
    <Drawer
      height="90vh"
      title={`Edit Product ${submitValue.prod_name}`}
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
          "")}
      <Form className="login-form" onSubmit={updateProduct} style={{overflow: 'auto'}}>
          <Input
            style={{ marginBottom: "15px" }}
            prefix={
              <Icon type="dropbox" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Product Name"
            onChange={handleChange("prod_name")}
            value={submitValue.prod_name}
          />
          <Input
            style={{ marginBottom: "15px" }}
            prefix={
              <Icon type="picture" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Image Url"
            onChange={handleChange("prod_image")}
            value={submitValue.prod_image}
          />
          <TextArea
            style={{ marginBottom: "15px" }}
            type="text"
            placeholder="Description"
            rows={4}
            onChange={handleChange("prod_desc")}
            value={submitValue.prod_desc}
          />
          <Select
            defaultValue={submitValue.category_id}
            onChange={onChangeInputNumber("category_id")}
            style={{ marginBottom: "15px" }}
          >
            {props.categoryData.data.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
          <span className="title-h4">Price</span>
          <InputNumber
            min={1000}
            defaultValue={submitValue.price}
            style={{width:"100%", marginBottom: "15px"}}
            onChange={onChangeInputNumber("price")}
          />
          <span className="title-h4">Quantity</span>
          <InputNumber
            min={0}
            defaultValue={submitValue.quantity}
            style={{width:"100%"}}
            onChange={onChangeInputNumber("quantity")}
          />
          <Button
            style={{ marginTop: "15px" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={response.loading}
          >
            Add Product
          </Button>
        </Form>
    </Drawer>
  );
};

export default EditProductDrawer;
