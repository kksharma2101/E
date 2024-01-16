import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //   getAllProducts
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/get-product");
      if (data?.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard-Products"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row" style={{ marginTop: "70px" }}>
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((pro) => (
                <Link
                  key={pro._id}
                  to={`/dashboard/admin/product/${pro.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/product/product-photo/${pro._id}`}
                      className="card-img-top"
                      alt={pro.name}
                      width={"180px"}
                      height={"250px"}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pro.name}</h5>
                      <h5>{pro.price}</h5>
                      <p className="card-text">{pro.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
