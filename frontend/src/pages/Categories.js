import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All - Categories"}>
      <div className="row container">
        {categories?.map((c) => (
          <div className="col-md-6 mb-3 mt-2" key={c._id}>
            <Link to={`/category/${c.slug}`} className="btn btn-primary">
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
