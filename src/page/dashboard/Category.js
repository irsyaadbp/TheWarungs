import React, { useState, useEffect } from "react";
import {
  Table,
  Divider,
  Card,
  Button,
  Icon,
  Popconfirm,
  notification
} from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";
import useWindowDimensions from "../../helpers/useWindowDimensions";
import CategoryDrawer from "../../components/CategoryDrawer";

const Category = () => {
  const [valueData, setValueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [pagination, setPagination] = useState({});
  const [isLogin, setLogin] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState({
    visible: false,
    data: {}
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",

      render: (id, record) =>
        valueData.length >= 1 && record.id !== 1 ? (
          <span>
            <Button
              onClick={event => updateVisibleEdit(record)}
              type="primary"
              ghost
            >
              <Icon type="edit" />
              Edit
            </Button>
            <Divider type="vertical" />

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <Button type="danger" ghost>
                <Icon type="delete" />
                Delete
              </Button>
            </Popconfirm>
          </span>
        ) : null
    }
  ];

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (localStorage.getItem("jwt") !== null) setLogin(true);
      else setLogin(false);
      if (!isLogin) return <Redirect to="/" />;
      else fetchData({});
    }, 0);

    return () => clearTimeout(timeOut);
  }, [isLogin]);

  const handleTableChange = page => {
    setPagination({ ...pagination, current: page.current });
    fetchData({
      perpage: page.pageSize,
      page: page.current
    });
  };

  const fetchData = (params = {}) => {
    setLoading(true);

    axios
      .get("http://192.168.6.139:2020/category", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
        },
        params
      })
      .then(response => {
        if (response.data.status === 200) {
          setPagination({
            total: response.data.result.infoPage.totalAllCategory
          });
          setValueData(response.data.result.data);
          setLoading(false);
        }
      });
  };

  const updateVisibleAdd = () => {
    setVisibleAdd(!visibleAdd);
  };

  const updateVisibleEdit = record => {
    setVisibleEdit({
      visible: !visibleEdit.visible,
      data: record
    });
  };

  const handleDelete = record => {
    axios
      .delete(`http://192.168.6.139:2020/category/${record.id}`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("jwt")).token
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          setValueData(valueData.filter(item => item.id !== record.id));

          notification.success({
            message: "Success Deleted Category",
            description: `Success Deleted Category ${record.name}.`
          });
        } else {
          notification.error({
            message: "Failed Deleted Category",
            description: `I'm Sorry :(, We Can't Delete ${record.name} Category.`
          });
        }
      })
      .catch(err => {
        notification.error({
          message: "Failed Deleted Category",
          description: `I'm Sorry :(, We Can't Delete ${record.name} Category.`
        });
      });
  };

  return (
    <div id="category-container">
      <Card title="Categories" bordered={false}>
        <Button
          type="primary"
          icon="plus"
          onClick={updateVisibleAdd}
          style={{ marginBottom: "20px", float: "right", zIndex: 1 }}
          size="large"
        >
          Add
        </Button>
        <CategoryDrawer
          visible={visibleAdd}
          updateVisible={updateVisibleAdd}
          title="Add Product"
          type="add"
          onProcessSuccess={fetchData}
        />
        <CategoryDrawer
          visible={visibleEdit.visible}
          updateVisible={updateVisibleEdit}
          title={`Edit Category ${visibleEdit.data.name}`}
          data={visibleEdit.data}
          type="update"
          onProcessSuccess={fetchData}
        />
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={valueData}
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

export default Category;
