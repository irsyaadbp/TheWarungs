import React, { useState, useEffect } from "react";
import useWindowDimensions from "../../helpers/useWindowDimensions";
import { Layout, Icon, Divider, Button } from "antd";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Navbar from "../../components/Navbar";
import CardCart from "../../components/CardCart";
import Category from "./Category";
import Order from "./Order";

const { Content, Header } = Layout;

const Dashboard = props => {
  const [distance, setDistance] = useState("0");
  const [redirect, setRedirect] = useState(false);
  const { width } = useWindowDimensions();

  const openNav = () => {
    if (distance === "0") {
      if (width > 840) setDistance("450px");
      else setDistance("100vw");
    } else setDistance("0");
  };

  const closeNav = () => {
    setDistance("0");
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) setRedirect(false);
    else setRedirect(true);
  }, []);

  if (redirect) return <Redirect to="/" />;

  return (
    <Layout
      id="dashboard-container"
      style={{ marginRight: width > 720 ? distance : 0 }}
    >
      <div id="cartSideNav" className="sidenav" style={{ width: distance }}>
        <Header>
          <span className="title-h2-white">Detail Order</span>
          <Icon type="close" onClick={closeNav} className="closebtn" />
          <Divider style={{ margin: 0, backgroundColor: "#5a5a5a" }} />
        </Header>
        <div className="cart-container">
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
        </div>
        <div className="cart-total">
          <span className="title-h2-white" style={{float:'left'}}>Total:</span>
          <span className="title-h2-white" style={{float:'right'}}>Rp 2.000.020</span>
        </div>
        <div className="cart-checkout">
          <Button type="primary" style={{width:'100%', marginBottom: '10px'}}>Checkout</Button>
          <Button type="default" style={{width:'100%'}} ghost>Clear all</Button>
        </div>
      </div>
      <Navbar />

      <Layout>
        <Header id="topHeader">
          <span className="title-h2">The Warungs</span>

          <span
            style={{ fontSize: "20px", cursor: "pointer", float: "right" }}
            onClick={openNav}
          >
            <Icon type="shopping-cart" />
          </span>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Route exact path="/dashboard" component={Home} />
          <Route path="/dashboard/order" component={Order} />
          <Route path="/dashboard/products" component={Product} />
          <Route path="/dashboard/categories" component={Category} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
