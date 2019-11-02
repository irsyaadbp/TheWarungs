import React, { useState } from "react";
import { Layout, Menu, Icon, Avatar} from "antd";
import { Link, withRouter } from "react-router-dom";

import { logout } from "../redux/actions/auth";
import { useDispatch } from "react-redux";

const { Sider} = Layout;
const { SubMenu } = Menu;


const Navbar = props => {
  const [collapsed, setCollapsed] = useState(true);

  const dispatch = useDispatch()
  const userLogout = async () => {
    await dispatch(logout());
    props.history.push('/');
  }

  return (
      <Sider
        id="mySideBar"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0
        }}
      >
        <div className="logo">
          <Avatar size="large" icon="user" />
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to="/dashboard">
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/dashboard/order">
              <Icon type="file-done" />
              <span>Order</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="read" />
                <span>Manage</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/dashboard/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/dashboard/categories">Categories</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5" onClick={userLogout}>
              <Icon type="poweroff" />
              <span>Log out</span>
          </Menu.Item>
        </Menu>
      </Sider>
  );
};

export default withRouter(Navbar);
