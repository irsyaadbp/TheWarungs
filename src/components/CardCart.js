import React from "react";
import { Col, Button, Icon, InputNumber, Row } from "antd";
// import NumberFormat from "react-number-format";
// import { alignElement } from "dom-align";

// const ButtonGroup = Button.Group;
const CardProduct = props => {
  return (
    <Row style={{ height: "50px" }}>
      <Col md={{ span: 4}} sm={{ span: 4 }} xs={{ span: 4 }}>
        <Button ghost type="danger" size="small" style={{marginTop: '10px'}}>
          <Icon type="delete" />
        </Button>
      </Col>
      <Col md={{ span: 14 }} sm={{ span: 14 }} xs={{ span: 14 }}>
        <span style={{ color: "white" }}>Indomie</span>
        <br />
        <span style={{ color: "white" }}>Rp 313.131</span>
      </Col>
      <Col md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }}>
        <InputNumber
          min={1}
          max={10}
          defaultValue={3}
          style={{ width: "50px", float: "right", marginTop: '5px'}}
        />
      </Col>
    </Row>
  );
};

export default CardProduct;
