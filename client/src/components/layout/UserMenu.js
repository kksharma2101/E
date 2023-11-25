import React from "react";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <Layout>
      <div className="text-center">
        <div className="list-group">
          <h3>Admin pannel</h3>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </Layout>
  );
};

export default UserMenu;
