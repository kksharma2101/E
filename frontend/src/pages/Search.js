import React from "react";
import { useSearch } from "../context/SearchContext";
import Layout from "../components/layout/Layout";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search - Results"}>
      <div className="container">
        <div className="text-center" style={{ paddingTop: "80px" }}>
          <h1>Search results</h1>
          <h5>
            {values?.results.length < 1
              ? "Results not found"
              : `total ${values?.results.length}`}
          </h5>
          <div className="d-flex flex-wrap justify-content-center mt-4">
            {values?.results?.map((pro) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={pro._id}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/api/product/product-photo/${pro._id}`}
                  class="card-img-top"
                  alt={pro.name}
                />
                <div className="card-body">
                  <h3>{pro.name}</h3>
                  <h3>$ {pro.price}</h3>
                  <p className="card-text">
                    {pro.description.substring(0, 30)}...
                  </p>
                  <button href="#" class="btn btn-primary ms-2">
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

export default Search;
