import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./authStyle.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [auth, setAuth] = useState();

  //   create handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      // console.log(res);
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.token,
        });
        // console.log(auth);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        await toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="container-fluid p-2 dashboard">
        <div
          className="form-container"
          style={{ marginTop: "70px", color: "#000", height: "100vh" }}
        >
          <form onSubmit={handleSubmit}>
            <h1 className="title">Register Page</h1>
            <div className="mb-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                placeholder="Name"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                placeholder="Address"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAnswer"
                placeholder="Write your favorite something"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
