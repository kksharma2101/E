import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth";

const Homepage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Best offers"}>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(auth, null)}</pre>
    </Layout>
  );
};

export default Homepage;
