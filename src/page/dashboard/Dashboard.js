import React, { useState, useEffect } from "react";
import useWindowDimensions from "../../helpers/useWindowDimensions";
import { Layout, Icon, Divider, Button, notification } from "antd";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Navbar from "../../components/Navbar";
import CardCart from "../../components/CardCart";
import Category from "./Category";
import Order from "./Order";
import NumberFormat from "react-number-format";

import { getUserDetail } from "../../redux/actions/auth";
import { checkoutOrder } from "../../redux/actions/order";
import { useSelector, useDispatch } from "react-redux";

const { Content, Header } = Layout;

const Dashboard = () => {
  const [distance, setDistance] = useState("0");
  const { width } = useWindowDimensions();
  // const [input, setInput] = useState({
  //   admin_id: "",
  //   totalPrice: 0,
  //   detailOrder: []
  // });

  const { user, detailOrder, totalPrice } = useSelector(state => ({
    user: state.auth.user,
    detailOrder: state.order.detailOrder,
    totalPrice: state.order.total_price
  }));

  const dispatch = useDispatch();

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
    const timeout = setTimeout(async () => {
      await dispatch(getUserDetail());
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const submitCheckoutOrder = async () => {
    const submitCheckout = await dispatch(
      checkoutOrder(user.token, {
        admin_id: user.user_id,
        total_price: totalPrice,
        detail_order: detailOrder
      })
    );

    console.log(submitCheckout.value.data, "submit value");

    if (submitCheckout.value.data.status === 200) {
      notification.success({
        message: "Success",
        description: `Checkout Successfully.`
      });
    } else {
      notification.error({
        message: "Failed",
        description: `Checkout failed, please try again.`
      });
    }
  };

  return (
    <Layout
      id="dashboard-container"
      style={{ marginRight: width > 720 ? distance : 0 }}
    >
      <div id="cartSideNav" className="sidenav" style={{ width: distance }}>
        <Header>
          <span className="title-h2-white">Detail Order</span>
          <Icon type="close" onClick={closeNav} className="closebtn" />
          <Divider className="divider" />
        </Header>
        <div className="cart-container">
          {detailOrder.length === 0
            ? (<span style={{color: "rgb(204, 204, 204)"}}>Empty Cart</span>)
            : detailOrder.map((item, index) => {
                return <CardCart key={index} product={item} />;
              })}
        </div>
        <div className="cart-total">
          <span className="title-h2-white title-total-cart">Total:</span>
          <NumberFormat
            value={totalPrice}
            className="title-h2-white total-cart"
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp"}
          />
        </div>
        <div className="cart-checkout">
          <Button
            type="primary"
            className="btn-cart-checkout"
            onClick={submitCheckoutOrder}
          >
            Checkout
          </Button>
          <Button type="default" className="btn-cart-cancel" ghost>
            Clear all
          </Button>
        </div>
      </div>
      <Navbar />
      <Layout>
        <Header id="topHeader">
          <span className="title-h2">The Warungs</span>

          <span className="shopping-cart" onClick={openNav}>
            <Icon type="shopping-cart" />
          </span>
        </Header>
        <Content className="content">
          <Route exact path="/dashboard">
            {!user ? <Redirect to="/" /> : <Home user={user} />}
          </Route>
          <Route path="/dashboard/order">
            {!user ? <Redirect to="/" /> : <Order user={user} />}
          </Route>
          <Route path="/dashboard/products">
            {!user ? <Redirect to="/" /> : <Product user={user} />}
          </Route>
          <Route path="/dashboard/categories">
            {!user ? <Redirect to="/" /> : <Category user={user} />}
          </Route>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
