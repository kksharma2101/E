import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Homepage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setProducts([...products, ...data?.product]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);

  // get total pages
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

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
    getTotal();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      // if (data?.success) {
      setProducts(data?.product);
      // }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((cate) => cate !== id);
    }
    setChecked(all);
  };

  // filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/product/filter-product", {
        checked,
        radio,
      });
      if (data?.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-2">
        <div className="col-md-2">
          <h5 className="text-center">Filter by category</h5>
          <div className="d-flex flex-column ms-1">
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
          <h5 className="text-center mt-2">Filter by Prices</h5>
          <div className="d-flex flex-column ms-1">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-1 mt-3">
            <button
              className="btn btn-primary p-0"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="col-md-10 ">
          <h2 className="text-center mb-4">All Products</h2>
          <div className="d-flex flex-wrap justify-content-center">
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
                  <h3>{pro.name}</h3>
                  <h3>$ {pro.price}</h3>
                  <p className="card-text">
                    {pro.description.substring(0, 30)}...
                  </p>
                  <button
                    href="#"
                    class="btn btn-primary ms-2"
                    onClick={() => navigate(`/product/${pro.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    href="#"
                    class="btn btn-secondary ms-2"
                    onClick={() => {
                      setCart([...cart, pro]);
                      localStorage.setItem("cart", JSON.stringify([...cart, pro]));
                      toast.success("Item add to cart successfully");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-2">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading...." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
