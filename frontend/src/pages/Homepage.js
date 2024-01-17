import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/Homepage.css";
// import img from "../craousel/images(1).jpg";

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
      {/* add craousel */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/banner1.png"
              className="d-block w-100"
              alt="craousel"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/banner2.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/banner3.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* end craousel */}
      <div className="container-fluid row mt-2 home-page">
        <div className="col-md-2 filters">
          <h5 className="mt-2">Prices</h5>
          <div className="d-flex flex-column ms-1">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="color">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <h5 className="">Category</h5>
          <div className="d-flex flex-column ms-1">
            {category?.map((cat) => (
              <Checkbox
                key={cat._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, cat._id);
                }}
                className="color"
              >
                {cat.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="col-md-10 ">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((pro) => (
              <div className="card m-2" key={pro._id}>
                <img
                  src={`/api/product/product-photo/${pro._id}`}
                  class="card-img-top"
                  alt={pro.name}
                  width={"100%"}
                  height={"300px"}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{pro.name}</h5>
                    <h5 className="card-title card-price">
                      {pro.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {pro.description.substring(0, 40)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      href="#"
                      class="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${pro.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      href="#"
                      class="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, pro]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, pro])
                        );
                        toast.success("Item add to cart successfully");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-2">
            {products && products.length < total && (
              <button
                className="btn btn-warning loadmore"
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
