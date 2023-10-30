import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import firebase from 'firebase/compat/app';
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import 'firebase/compat/auth';
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Orders from './Orders';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
const promise = loadStripe('pk_test_51Mn4P7SAl5gguNQ4TMivZNahFTYZPjmh4WWyjiUFKRGPoiGjtPvGejfKvAMm6VYzPQno8jN9wsPos2CSauHK6z8q00QemiUUHN');
function App() {
 const [{basket}, dispatch] = useStateValue();

  const auth = firebase.auth();
  useEffect(()=>{  // it runs when the App.js component loads
      auth.onAuthStateChanged(authUser=>{
        console.log("The AuthUser is " , authUser);
        if(authUser){
          // The user logged just logged in or was logged in
          dispatch({
            type : 'SET_USER',
            user : authUser
          })
        }
        else{
          // The user logged out
          dispatch({
            type : 'SET_USER',
            user : null
          })

        }
      })
      //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/orders" element={ <><Header /> <Orders/> </>} ></Route>
          <Route exact path="/login" element={<Login/>} ></Route>
          <Route exact path="/" element={<>  <Header /> <Home/> </>}></Route>
          <Route exact path="/checkout" element={ <><Header /> <Checkout/></> }></Route>
          <Route exact path="/payment" element={<>  <Header /> 
          <Elements stripe={promise}>         
          <Payment/>
          </Elements>
          </>} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
