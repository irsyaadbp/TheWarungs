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
import AddProductDrawer from "../../components/AddProductDrawer";
import EditProductDrawer from "../../components/EditProductDrawer";

const Product = props => {
  const [valueData, setValueData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const { width } = useWindowDimensions();
  const [visibilityEdit, setVisibilityEdit] = useState(false);
  const [dataRow, setDataRow] = useState({});
  const [categoryData, setCategoryData] = useState({
    status: "",
    data: [],
    error: ""
  });

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (<img src={text} className="img-list-product" alt={record.name}/>)
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "name",
      sorter: true
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",

      render: (id, record) =>
        valueData.length >= 1 ? (
          <span>
            <Button
              onClick={event => editModalVisible(record)}
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

  const editModalVisible = record => {
    setVisibilityEdit(!visibilityEdit);
    const currentCategory = categoryData.data.find(
      item => item.name === record.category
    );
    const row = {
      ...record,
      category:
        currentCategory !== undefined ? currentCategory.id : record.category
    };
    setDataRow(row);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (localStorage.getItem("jwt") !== null) setLogin(true);
      else setLogin(false);
      if (!isLogin) return <Redirect to="/" />;
      else {
        fetchData({});
        getCategory();
      }
    }, 100);

    return () => clearTimeout(timeOut);
  }, [isLogin]);

  const handleTableChange = (page, filters, sorter) => {
    setPagination({ ...pagination, current: page.current });
    if (sorter.field === "product_name") sorter.field = "name";

    if (sorter.order === "descend") sorter.order = "desc";
    else sorter.order = "asc";
    fetchData({
      perpage: page.pageSize,
      page: page.current,
      sortby: sorter.field,
      orderby: sorter.order
    });
  };

  const handleDelete = record => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/product/${record.id}`, {
        headers: {
          "Authorization": JSON.parse(localStorage.getItem("jwt")).token
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          setValueData(valueData.filter(item => item.id !== record.id));

          notification.success({
            message: "Success Deleted Product",
            description: `Success Deleted Product ${record.product_name}.`
          });
        } else {
          notification.error({
            message: "Failed Deleted Product",
            description: `I'm Sorry :(, We Can't Delete Product ${record.product_name}.`
          });
        }
      })
      .catch(err => {
        notification.error({
          message: "Failed Deleted Product",
          description: `Connection lost :(`
        });
      });
  };

  const fetchData = (params = {}) => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product`, {
        headers: {
          "Authorization": JSON.parse(localStorage.getItem("jwt")).token
        },
        params
      })
      .then(response => {
        if (response.data.status === 200) {
          setPagination({
            total: response.data.result.infoPage.totalAllProduct
          });
          setValueData(response.data.result.data);
          setLoading(false);
        }
      });
  };

  const getCategory = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/category`, {
        headers: {
          "Authorization": JSON.parse(localStorage.getItem("jwt")).token
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          setCategoryData({
            status: 200,
            data: response.data.result.data,
            error: ""
          });
        } else {
          setCategoryData({
            status: 400,
            data: [],
            error: response.data.result.message
          });
        }
      })
      .catch(err =>
        setCategoryData({ status: 400, data: [], error: "Connection lost :(" })
      );
  };

  return (
    <div id="product-container">
      <Card title="Products" bordered={false}>
        <EditProductDrawer
          visible={visibilityEdit}
          updateVisible={editModalVisible}
          dataEdit={dataRow}
          categoryData={categoryData}
          onEditSuccess={fetchData}
        />
        <AddProductDrawer categoryData={categoryData} onAddSuccess={fetchData}/>
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

export default Product;
