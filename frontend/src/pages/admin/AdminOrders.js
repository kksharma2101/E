import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [auth, setAuth] = useAuth();
  const [changeStatus, setChangeStatus] = useState("");
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  //   console.log(order);
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/all-orders");
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.user) getAllOrders();
  }, [auth?.token]);

  //   handle change
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/update-status/${orderId}`, {
        status: value,
      });
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="row m-3 p-2">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All Orders</h2>
          {order?.map((item, index) => (
            <div className="border shadow" key={index}>
              <table className="table">
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
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(item._id, value)}
                        defaultValue={item?.status}
                      >
                        {status.map((el, i) => (
                          <Option key={i} value={el}>
                            {el}
                          </Option>
                        ))}
                      </Select>
                    </td>
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
    </Layout>
  );
};

export default AdminOrders;
