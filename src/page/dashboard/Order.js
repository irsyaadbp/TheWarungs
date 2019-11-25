import React, { useState, useEffect } from "react";
import CardProduct from "../../components/CardProduct";
import { Row, Divider, Card, Spin, Input, Select, Pagination } from "antd";

import { getProduct } from "../../redux/actions/product";
import {
  getProductInOrder,
  addItemInOrder,
  removeItemInOrder
} from "../../redux/actions/order";
import { useSelector, useDispatch } from "react-redux";

const { Search } = Input;
const { Option } = Select;

const Order = props => {
  const { detailOrder, productList, isLoading } = useSelector(
    state => state.order
  );

  const dispatch = useDispatch();

  const [dataParams, setDataParams] = useState({
    search: "",
    sortby: "",
    orderby: "",
    page: ""
  });

  const [maxProduct, setMaxProduct] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData(dataParams);
    }, 0);

    return () => clearTimeout(timeOut);
  }, [dataParams]);

  const fetchData = async (params = {}) => {
    const getData = await dispatch(getProductInOrder(props.user.token, params));

    if (getData.value.data.status === 200) {
      setMaxProduct(getData.value.data.result.infoPage.totalAllProduct);
    } else {
      setMaxProduct(0);
    }
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

  const handleSelectedProduct = async product => {
    if (!product.isSelected) await dispatch(addItemInOrder(product));
    else await dispatch(removeItemInOrder(product));
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
        <div className="filter-container">
          <span className="title-filter">Sort by</span>
          <Select defaultValue="Choose" onChange={handleChange("sortby")}>
            <Option value="name">Name</Option>
            <Option value="category">Category</Option>
          </Select>
        </div>
        <Divider type="vertical" />
        <div className="filter-container">
          <span className="title-filter" onChange={handleChange("orderby")}>
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
        {isLoading ? (
          <Spin />
        ) : (
          <div>
            {productList.length === 0 ? (
              <div>
                <img
                  className="img-notfound"
                  src="/assets/empty.svg"
                  alt="empty product"
                />
                <p style={{ textAlign: "center" }} className="title-h2">
                  Not Found
                </p>
              </div>
            ) : (
              productList.map(item => (
                <CardProduct
                  onClick={() => handleSelectedProduct(item)}
                  data={item}
                  key={item.id}
                  isSelected={item.isSelected}
                />
              ))
            )}
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
