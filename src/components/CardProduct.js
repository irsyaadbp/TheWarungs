import React from "react";
import { Col } from "antd";
import NumberFormat from "react-number-format";
const CardProduct = props => {
  return (
    <Col md={12} lg={6} className="gutter-row">
      <div
        className={
          props.isSelected
            ? "img-order-product border-selected"
            : "img-order-product"
        }
        style={{
          backgroundImage: `url(${props.data.image})`
        }}
        onClick={props.onClick}
      >
        <div className="product-container">
          <div>{props.data.product_name}</div>
          <div style={{ fontSize: "0.8em", fontWeight: "500" }}>
            {props.data.category}
          </div>
        </div>
        <div className="price-product">
          <NumberFormat
            value={props.data.price}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp"}
          />
        </div>
      </div>
    </Col>
  );
};

export default CardProduct;
