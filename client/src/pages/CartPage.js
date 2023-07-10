import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
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

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className=" cart-page">
        <div className="cart-banner" style={{backgroundImage: 'url(images/shoes-cart-1.jpg)'}}>
          <span className="cart-banner-title">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
          </span>
          <p className="cart-banner-subtitle text-center">
            {cart?.length
              ? `You Have ${cart.length} items in your cart. ${
                  auth?.token ? "" : "Please login to checkout !"
                }`
              : " Your Cart Is Empty"}
          </p>
        </div>
        <div className="container cart-container">
          <div className="row ">
            <div className="col-md-7 p-0 m-0">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                <div>
                  <h3 className="fw-normal mb-0 text-black">Total Items - {cart.length}</h3>
                </div>
              </div>
              {cart?.map((p) => (
              <div className="card rounded-3 mb-4">
                <div className="card-body p-4" key={p._id}>
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="img-fluid rounded-3" alt="Cotton T-shirt" />
                    </div>
                    <div className="col-md-4 col-lg-4 col-xl-4">
                      <p className="lead fw-normal mb-2">{p.name}</p>
                      <p><span className="text-muted">{p.description.substring(0, 30)} </span></p>
                    </div>
                    <div className="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">${p.price}</h5>
                    </div>
                    <div className="col-md-2 col-lg-2 col-xl-2 text-end">
                      <div className="remove-button-wrapper">
                        <button
                          className="remove-button"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                ))}
            </div>
            <div className="col-md-4 cart-summary rounded-3 mb-4">
              <div className="cart-summary-title"><h2>Cart Summary</h2></div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>{totalPrice()}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>$0.00</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span><strong>{totalPrice()}</strong></span>
                </li>
              </ul>

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h5>Current Address</h5>
                    <h6>{auth?.user?.address}</h6>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;