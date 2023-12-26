import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  //   console.log(cart);

  // handleRemoveItem
  const handleRemoveItem = (pid) => {
    let cardItem = [...cart];
    setCart(cardItem.filter((index) => index !== pid));
    return cardItem;
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <h1 className="text-center mt-2 bg-light came">
            {`Hello Mr/Mis ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center mt-1">
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
              <div className="row card flex-row p-2 mt-2" key={pro._id}>
                <div className="col-md-3">
                  <img
                    src={`/api/product/product-photo/${pro._id}`}
                    class="card-img-top"
                    alt={pro.name}
                    width={"100%"}
                    height={"140px"}
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
          <div className="col-md-5">Payment and checkout</div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
