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
import CategoryDrawer from "../../components/CategoryDrawer";

import { getCategory, deleteCategory } from "../../redux/actions/category";
import { useSelector, useDispatch } from "react-redux";

const Category = props => {
  const { width } = useWindowDimensions();
  const [pagination, setPagination] = useState({});
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState({
    visible: false,
    data: {}
  });

  const { categoryList, isLoading } = useSelector(state => state.category);
  const dispatch = useDispatch();

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
        categoryList.length >= 1 && record.id !== 1 ? (
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
      fetchData({});
    }, 0);

    return () => clearTimeout(timeOut);
  }, []);

  const handleTableChange = page => {
    setPagination({ ...pagination, current: page.current });
    fetchData({
      perpage: page.pageSize,
      page: page.current
    });
  };

  const fetchData = (params = {}) => {
    dispatch(getCategory(props.token, params)).then(response => {
      if (response.value.data.status === 200) {
        setPagination({
          ...pagination,
          total: response.value.data.result.infoPage.totalAllCategories
        });
      } else {
        setPagination({ ...pagination, total: 0 });
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

  const handleDelete = async record => {
    const deleteProcess = await dispatch(
      deleteCategory(props.token, record.id)
    );

    if (deleteProcess.value.data.status === 200) {
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
          token={props.token}
          onProcessSuccess={fetchData}
        />
        <CategoryDrawer
          visible={visibleEdit.visible}
          updateVisible={updateVisibleEdit}
          title={`Edit Category`}
          data={visibleEdit.data}
          type="update"
          token={props.token}
          onProcessSuccess={fetchData}
        />
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={categoryList}
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

export default Category;
