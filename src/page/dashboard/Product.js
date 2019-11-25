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
import useWindowDimensions from "../../helpers/useWindowDimensions";
import AddProductDrawer from "../../components/AddProductDrawer";
import EditProductDrawer from "../../components/EditProductDrawer";

import { getProduct, deleteProduct } from "../../redux/actions/product";
import { getCategory } from "../../redux/actions/category";
import { useSelector, useDispatch } from "react-redux";

const Product = props => {
  const [pagination, setPagination] = useState({});
  const { width } = useWindowDimensions();
  const [visibilityEdit, setVisibilityEdit] = useState(false);
  const [dataRow, setDataRow] = useState({});

  const { productState, categoryList } = useSelector(state => ({
    productState: state.product,
    categoryList: state.category.categoryList
  }));

  const { productList, isLoading } = productState;

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img src={text} className="img-list-product" alt={record.name} />
      )
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
        productList.length >= 1 ? (
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
    const currentCategory = categoryList.find(
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
      fetchData({});
    }, 0);

    return () => clearTimeout(timeOut);
  }, []);

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

  const handleDelete = async record => {
    const deleteProcess = await dispatch(
      deleteProduct(props.user.token, record.id)
    );

    if (deleteProcess.value.data.status === 200) {
      notification.success({
        message: "Success Deleted Product",
        description: `Success Deleted Product ${record.product_name}.`
      });
    } else {
      notification.error({
        message: "Failed Deleted Category",
        description: `I'm Sorry :(, We Can't Delete ${record.product_name} Category.`
      });
    }
  };

  const fetchData = async (params = {}) => {
    dispatch(getProduct(props.user.token, params)).then(response => {
      if(response.value.data.status === 200){
        setPagination({...pagination, total: response.value.data.result.infoPage.totalAllProduct})
      }else{
        setPagination({...pagination, total: 0})
      }
    });
    await dispatch(getCategory(props.user.token));
  };

  return (
    <div id="product-container">
      <Card title="Products" bordered={false}>
        <EditProductDrawer
          visible={visibilityEdit}
          updateVisible={editModalVisible}
          dataEdit={dataRow}
          categoryData={categoryList}
          token={props.user.token}
        />
        <AddProductDrawer categoryData={categoryList} token={props.user.token} />
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={productList}
          loading={isLoading}
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
