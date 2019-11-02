import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import useWindowDimensions from "../../helpers/useWindowDimensions";
import NumberFormat from "react-number-format";
import { getRecentOrder } from "../../redux/actions/recentOrder";
import { useSelector, useDispatch } from "react-redux";

const Home = props => {
  const [pagination, setPagination] = useState({});
  const { width } = useWindowDimensions();

  const { recentOrderList, isLoading } = useSelector(
    state => state.recentOrder
  );
  const dispatch = useDispatch();

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
          <NumberFormat
            value={text}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp"}
          />
        );
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    }
  ];

  const handleTableChange = page => {
    console.log(page, "order page")
    setPagination({ ...pagination, current: page.current });
    fetchDataOrder({
      perpage: page.pageSize,
      page: page.current
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchDataOrder({});
    }, 0);

    return () => clearTimeout(timeOut);
  }, []);

  const fetchDataOrder = (params = {}) => {
    dispatch(getRecentOrder(props.token, params)).then(response => {
      if(response.value.data.status === 200){
        setPagination({...pagination, total: response.value.data.result.infoPage.totalAllOrder})
      }else{
        setPagination({...pagination, total: 0})
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
          // dataSource={dataOrder}
          dataSource={recentOrderList.status === 200 ? recentOrderList.result.data : []}
          loading={isLoading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={width > 840 ? "" : { x: "max-content" }}
          size={"small"}
        />
      </Card>
    </div>
  );
};

export default Home;
