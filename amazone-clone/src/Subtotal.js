import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import {useNavigate} from 'react-router-dom';

function Subtotal() {
  const navigate = useNavigate();
    const [{basket} , dipatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(values) => (
          <>
            <p>
              Subtotal({basket.length} items):<strong>{values}</strong>
            </p>
            <small className="subtotal__gifts">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={ e => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;