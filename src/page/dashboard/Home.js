import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Table, Card } from "antd";
import useWindowDimensions from "../../helpers/useWindowDimensions";
import NumberFormat from "react-number-format";

const Home = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const { width } = useWindowDimensions();

  const columns = [
    {
      title: "Order Id",
      dataIndex: "order_id",
      key: "order_id"
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: text => {
          return (
            <NumberFormat value={text} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'} />
          )
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    }
  ];

  const handleTableChange = page => {
    setPagination({ ...pagination, current: page.current });
    fetchDataOrder({
      perpage: page.pageSize,
      page: page.current
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (localStorage.getItem("jwt") !== null) setLogin(true);
      else setLogin(false);
      if (!isLogin) return <Redirect to="/" />;
      else {
        fetchDataOrder({});
      }
    }, 0);

    return () => clearTimeout(timeOut);
  }, [isLogin]);

  const fetchDataOrder = (params = {}) => {
    setLoading(true);

    axios
      .get("http://192.168.6.139:2020/order", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
        },
        params
      })
      .then(response => {
        if (response.data.status === 200) {
          setDataOrder(response.data.result.data);
          setLoading(false);
        }
    });
};
  return (
    <div>
      <h4>HOME</h4>
      <Card title="Recent Order" bordered={false}>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={dataOrder}
          loading={loading}
          pagination={pagination}
          scroll={width > 840 ? "" : { x: "max-content" }}
          onChange={handleTableChange}
          size={"small"}
        />
      </Card>
    </div>
  );
};

export default Home;
