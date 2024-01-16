import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid p-2">
        <div className="row" style={{ marginTop: "70px" }}>
          <div className="col-md-3">{<UserMenu />}</div>
          <div className="col-md-9">
            <div className="card p-3" style={{ color: "black" }}>
              <h2>Your name: {auth?.user?.name}</h2>
              <h4>Your number: {auth?.user?.phone}</h4>
              <h4>Your address: {auth?.user?.address}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
