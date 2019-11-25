import React, { useState } from "react";
import { Col, Button, Icon, InputNumber, Row } from "antd";
import NumberFormat from "react-number-format";

import { removeItemInOrder, quantityChange } from "../redux/actions/order";
import { useDispatch } from "react-redux";

const CardProduct = props => {
  const dispatch = useDispatch();

  const handleQuantityChange = id => async value => {
    await dispatch(quantityChange({ id, quantity: value }));
  };

  return (
    <Row style={{ margin: "20px 0" }}>
      <Col md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
        <Button
          ghost
          type="danger"
          size="small"
          style={{ marginTop: "10px" }}
          onClick={async () => await dispatch(removeItemInOrder(props.product))}
        >
          <Icon type="delete" />
        </Button>
      </Col>
      <Col md={{ span: 14 }} sm={{ span: 14 }} xs={{ span: 14 }}>
        <span style={{ color: "white" }}>{props.product.product_name}</span>
        <br />
        <span style={{ color: "white" }}>
          <NumberFormat
            value={props.product.sub_total}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp"}
          />
        </span>
      </Col>
      <Col md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }}>
        <InputNumber
          min={1}
          max={props.product.oldQuantity}
          value={props.product.quantity}
          style={{ width: "50px", float: "right", marginTop: "5px" }}
          onChange={handleQuantityChange(props.product.prod_id)}
        />
      </Col>
    </Row>
  );
};

export default CardProduct;
