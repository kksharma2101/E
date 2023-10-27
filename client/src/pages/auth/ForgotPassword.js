import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./authStyle.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState();
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");

  //   create handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/forgot-password", {
        email,
        answer,
        newPassword,
      });
      // console.log(res);
      if (res && res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce app"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title mb-4">Reset Password</h2>

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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Write your favorite somthing"
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
