import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, Form, Icon, notification } from "antd";
import { createNewCategory, editCategory } from "../redux/actions/category";
import { useSelector, useDispatch } from "react-redux";

const CategoryDrawer = props => {
  const [submitValue, setSubmitValue] = useState({ id: "",category_name: "" });

  const { isLoading } = useSelector(
    state => state.category
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.type === "update") setSubmitValue({id: props.data.id,category_name: props.data.name})
    else setSubmitValue({ id: "",category_name: "" });
  }, [props]);

  const handleChange = inputName => event => {
    setSubmitValue({ ...submitValue, [inputName]: event.target.value });
  };

  const addCategory = async event => {
    event.preventDefault();

    const addNewCategory = await dispatch(createNewCategory(props.token, submitValue));

    if(addNewCategory.value.data.status === 200 ){
      notification.success({
        message: "Success Added Category",
        description: `Success Added Category ${submitValue.category_name}.`
      });
    } else {
      notification.error({
        message: "Failed Add Category",
        description: addNewCategory.value.data.message
      });
    }

  };

  const editCategoryName = async event => {
    event.preventDefault();

    props.updateVisible(submitValue)
    const updateCategory = await dispatch(editCategory(props.token, submitValue));
    
    if(updateCategory.value.data.status === 200 ){
      notification.success({
        message: "Success Edited Category",
        description: `Success Edited Category ${submitValue.category_name}.`
      });
    } else {
      notification.error({
        message: "Failed Edit Category",
        description: updateCategory.value.data.message
      });
    }

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
        onSubmit={props.type === "add" ? addCategory : editCategoryName}
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
          loading={isLoading}
          size="large"
        >
          {props.type === "add"? "Add Category" : "Edit Category"}
        </Button>
      </Form>
    </Drawer>
  );
};

export default CategoryDrawer;
