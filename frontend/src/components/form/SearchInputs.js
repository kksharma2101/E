import React, { useState } from "react";
import { useSearch } from "../../context/Search";

const SearchInputs = () => {
  const [values, setValues] = useState();

  // handle submit
  const handleSubmit = async () => {
    try {
        const {data} = await axios.get
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keywords}
          onClick={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInputs;
