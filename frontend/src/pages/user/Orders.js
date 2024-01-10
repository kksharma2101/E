import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  // get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [auth?.user]);
  return (
    <Layout title={"Your - Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">{<UserMenu />}</div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
