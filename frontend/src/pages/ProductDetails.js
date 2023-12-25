import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  //   console.log(relatedProduct)
  //   intial call
  useEffect(() => {
    if (params?.slug) getProduct();
  }, []);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //   get related product
  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center flex-wrap">
        <div className="col-md-6 p-4">
          <img
            src={`/api/product/product-photo/${product._id}`}
            class="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 p-4">
          <h1>{product?.name}</h1>
          <h2>$ {product?.price}</h2>
          <h4>{product?.category?.name}</h4>
          <h6>{product?.description}</h6>
          <button href="#" class="btn btn-secondary mt-2">
            Add to Cart
          </button>
        </div>
      </div>
      <hr />
      <h2 className="ms-4">Similar Product</h2>
      {relatedProduct.length < 1 && (
        <h6 className="text-center">No similar product found</h6>
      )}
      <div className="d-flex flex-wrap justify-content-center">
        {relatedProduct?.map((pro) => (
          <div className="card m-2" style={{ width: "18rem" }} key={pro._id}>
            <img
              src={`/api/product/product-photo/${pro._id}`}
              class="card-img-top"
              alt={pro.name}
            />
            <div className="card-body">
              <h3>{pro.name}</h3>
              <h3>$ {pro.price}</h3>
              <p className="card-text">{pro.description.substring(0, 30)}...</p>
              <button href="#" class="btn btn-secondary">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
