import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  //   console.log(cart);

  // handle totalPrice
  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle  RemoveItem
  const handleRemoveItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <h1 className="text-center mt-2 bg-light came">
            {`Hello Mr/Mis ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center mt-1 text-secondary">
            {cart?.length > 1
              ? `You have ${cart?.length} item in your cart ${
                  !auth?.user ? "Please checkout login" : ""
                } `
              : "Your cart is empty"}
          </h4>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((pro) => (
              <div className="row card flex-row p-2 mt-2 mb-2" key={pro._id}>
                <div className="col-md-3">
                  <img
                    src={`/api/product/product-photo/${pro._id}`}
                    class="card-img-top"
                    alt={pro.name}
                    width={"100%"}
                    // height={"140px"}
                  />
                </div>
                <div className="col-md-9">
                  <p>{pro?.name}</p>
                  <p>{pro?.description.substring(0, 50)}</p>
                  <p>{pro?.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(pro._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 text-center">
            <h2>Cart Summary</h2>
            <h4 className="text-secondary">Total | Checkout | Payment</h4>
            <hr />
            <h4>Total: {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
