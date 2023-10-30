import React, { useEffect, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Element} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import db from './firebase';
function Payment() {
  const [{ basket, user }] = useStateValue();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clintSecret, setClintSecret] = useState(true);



  useEffect(()=>{
  // it will generate the special secret key for the customer to pay the money

const getClientSecret = async () =>{
  const response = axios({
    method : 'post',
    // Stripe except the total in currencies  subunit
    url : `/payments/create?total=${getBasketTotal(basket)*100}`
  });
  setClintSecret(response.data.clientSecret) ;  
}

getClientSecret();
  },[basket])

  console.log("The secret is >>" , clintSecret);

  const handleSubmit = async (event) => {
    // will do the all stripe stuff
    event.preventDefault();
    setProcessing(true);
    const payload =await stripe.confirmCardPayment(clintSecret , {
      payment_method:{
        card: elements.getElement(CardElement),
      }
    }).then(({paymentIntent})=>{
      // paymentIntent = payment confirmation
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket:basket,
          amount:paymentIntent.amount,
          created:paymentIntent.created,
        })
      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type : "EMPTY_BASKET"
      })
      navigate('/orders');
    })
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout( <Link to={"/checkout"}>{basket.length} item</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>A5/16</p>
            <p>Ramapooram,Chennai</p>
            <p>600089 , Tamil Nadu</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>

          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onClick={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total : {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
