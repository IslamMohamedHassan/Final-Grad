/** @format */
import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import CartItem from "./cart-item";
import {PayPalScriptProvider,PayPalButtons} from "@paypal/react-paypal-js"


//Component
const Cart = () => {
  const { cartItems, getTotalAmount, checkout, productItems } =
    useContext(ShopContext);
  const totalAmount = getTotalAmount();
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div >
      </div>
      <div className="cartProduct">
        {productItems.map((product) => {
          if (cartItems[product.id] !== 0 && cartItems[product.id] !== null) {  
            return (
              <CartItem
                key={product.id}
                data={{ ...product }}
                
              />
            );
          } else {
            return ;
          }
        })}
      </div>

      <div className="text-center mt-5">
        <p style={{ fontSize: "2rem" }}>
          SubTotal:{" "}
          <span style={{ fontSize: "1.5rem", color: " #ff642e" }}>
            ${totalAmount}
          </span>
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/shop")}>
          Continue
        </button>

        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            checkout();
            navigate("/");
          }}>
          Checkout
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}>
                  <PayPalScriptProvider options={{"client-id":"AdhDbKF_Lov12WaVtt1dRbyhS4W3Np2M9SfjGlY5vrs4q8NOwMjG8icMqBxlvvdsOWjTilS-iVYyWdpD"}}>
           <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const name = details.payer.name.given_name;
                alert("Transaction completed by " + name);
              }}
            />
        </PayPalScriptProvider>
        </div>
    </div>
  );
};

export default Cart;
