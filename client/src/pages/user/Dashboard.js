import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">{<UserMenu />}</div>
          <div className="col-md-9">
            <div className="card p-3">
              <h1>Your name: {auth?.user?.name}</h1>
              <h3>Your number: {auth?.user?.phone}</h3>
              <h3>Your address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
