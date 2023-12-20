import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
// import { json } from "react-router-dom";
import { Prices } from "../components/Prices";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // get all products
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

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // hanelde filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((cate) => cate !== id);
    }
    setChecked(all);
  };

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-2">
        <div className="col-md-3">
          {/* {JSON.stringify(radio)} */}
          <h5 className="text-center">Filter by category</h5>
          <div className="d-flex flex-column ms-2">
            {category?.map((cat) => (
              <Checkbox
                key={cat._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, cat._id);
                }}
              >
                {cat.name}
              </Checkbox>
            ))}
          </div>
          <h5 className="text-center">Filter by Prices</h5>
          <div className="d-flex flex-column ms-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All Products</h2>
          <h3>Products</h3>
          <div className="d-flex flex-wrap">
            {products?.map((pro) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={pro._id}
              >
                <img
                  src={`/api/product/product-photo/${pro._id}`}
                  class="card-img-top"
                  alt={pro.name}
                />
                <div className="card-body">
                  <h2>{pro.name}</h2>
                  <p className="card-text">{pro.description}</p>
                  <button href="#" class="btn btn-primary">
                    More Details
                  </button>
                  <button href="#" class="btn btn-secondary ms-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
