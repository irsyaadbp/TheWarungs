import React, { useState, useEffect } from "react";
import CardProduct from "../../components/CardProduct";
import { Row, Divider, Card, Spin, Input, Select, Pagination } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
const { Search } = Input;
const { Option } = Select;

const Order = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [dataParams, setDataParams] = useState({
    search: "",
    sortby: "",
    orderby: "",
    page: ""
  });

  const [maxProduct, setMaxProduct] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (localStorage.getItem("jwt") !== null) setLogin(true);
      else setLogin(false);
      if (!isLogin) return <Redirect to="/" />;
      else fetchData(dataParams);
    }, 0);

    return () => clearTimeout(timeOut);
  }, [isLogin, dataParams]);

  const fetchData = (params = {}) => {
    setLoading(true);

    axios
      .get("https://the-warungs.herokuapp.com/product", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
        },
        params
      })
      .then(response => {
        setLoading(false);
        if (response.data.status === 200) {
          setDataProduct(response.data.result.data);
          setMaxProduct(response.data.result.infoPage.totalAllProduct);
        } else {
          setDataProduct([]);
          setMaxProduct(0);
        }
      });
  };

  const onSearch = value => {
    fetchData(dataParams);
  };

  const handleChange = inputName => event => {
    setDataParams({
      ...dataParams,
      [inputName]: typeof event != "string" ? event.target.value : event,
      page: 1
    });
  };

  const handleChangePagination = current => {
    setDataParams({ ...dataParams, page: current });
  };

  return (
    <div id="order-container">
      <Card style={{ width: "100%" }} bordered={false}>
        <Search
          placeholder="input search text"
          onSearch={value => onSearch(value)}
          onChange={handleChange("search")}
          enterButton
          size="large"
        />
      </Card>
      <div>
        <div style={{ display: "inline-block", marginTop: "16px" }}>
          <span style={{ marginRight: "8px" }}>Sort by</span>
          <Select defaultValue="Choose" onChange={handleChange("sortby")}>
            <Option value="name">Name</Option>
            <Option value="category">Category</Option>
          </Select>
        </div>
        <Divider type="vertical" />
        <div style={{ display: "inline-block", marginTop: "16px" }}>
          <span
            style={{ marginRight: "8px" }}
            onChange={handleChange("orderby")}
          >
            Order by
          </span>
          <Select defaultValue="Choose" onChange={handleChange("orderby")}>
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </div>
      </div>
      <Row
        gutter={[16, 16]}
        style={{ marginTop: "16px" }}
        className="row-product"
      >
        {loading ? (
          <Spin />
        ) : (
          <div>
            {dataProduct.map(item => (
              <CardProduct data={item} key={item.id} />
            ))}
          </div>
        )}
      </Row>
      <Pagination
        size="small"
        total={maxProduct}
        onChange={handleChangePagination}
        style={{ margin: "30px" }}
        defaultPageSize={12}
      />
    </div>
  );
};

export default Order;
