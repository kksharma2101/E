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
      const { data } = await axios.get("/api/orders");
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
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">{<UserMenu />}</div>
          <div className="col-md-9">
            <h2 className="text-center">All Orders</h2>
            {order?.map((item, index) => (
              <div className="border">
                <table className="table">
                  <thead>
                    <tr>
                      <td scope="col">#</td>
                      <td scope="col">Status</td>
                      <td scope="col">Buyer</td>
                      {/* <td scope="col">Orders</td> */}
                      <td scope="col">Payment</td>
                      <td scope="col">Quantity</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="col">{index + 1}</th>
                      <th scope="col">{item?.status}</th>
                      <th scope="col">{item?.buyer?.name}</th>
                      {/* if your want to show date, install moment package in frontend side */}
                      <th scope="col">
                        {item?.payment?.success ? "Success" : "Failed"}
                      </th>
                      <th>{item?.products?.length}</th>
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
                          src={`/api/product/product-photo/${pro._id}`}
                          class="card-img-top"
                          alt={pro.name}
                          width={"30px"}
                          height={"200px"}
                        />
                      </div>
                      <div className="col-md-8">
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
