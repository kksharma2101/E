import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All - Categories"}>
      <div
        className="container-fluid p-3 dashboard"
        style={{ height: "100vw" }}
      >
        <div className="row container" style={{ marginTop: "70px" }}>
          {categories?.map((c) => (
            <div className="col-md-6 mb-3 mt-2" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
