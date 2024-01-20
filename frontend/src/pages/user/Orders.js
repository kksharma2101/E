import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [order, setOrders] = useState([]);

  // get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [auth?.user]);
  return (
    <Layout title={"Your - Orders"}>
      <div className="container-fluid p-3">
        <div className="row" style={{ marginTop: "70px" }}>
          <div className="col-md-3">{<UserMenu />}</div>
          <div className="col-md-9">
            <h2 className="text-center">All Orders</h2>
            {order?.map((item, index) => (
              <div className="border" key={index}>
                <table className="table" style={{ color: "white" }}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      {/* <td scope="col">Orders</td> */}
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.status}</td>
                      <td>{item?.buyer?.name}</td>
                      {/* if your want to show date, install moment package in frontend side */}
                      <td>{item?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{item?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {item?.products?.map((pro) => (
                    <div
                      className="row card flex-row p-2 mt-2 mb-2"
                      key={pro._id}
                    >
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/api/product/product-photo/${pro._id}`}
                          class="card-img-top"
                          alt={pro.name}
                          width={"30px"}
                          height={"200px"}
                        />
                      </div>
                      <div className="col-md-8" style={{ color: "black" }}>
                        <p>{pro?.name}</p>
                        <p>{pro?.description.substring(0, 50)}</p>
                        <p>{pro?.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
