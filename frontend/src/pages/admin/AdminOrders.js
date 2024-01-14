import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";

const AdminOrders = () => {
  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="row m-3 p-2">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All Orders</h2>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
