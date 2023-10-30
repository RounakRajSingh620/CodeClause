import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import 'firebase/compat/auth';
import { auth } from "./firebase";

function Header() {
  const [{basket, user} ] = useStateValue();
  const handleAuthentication = ()=>{
       if(user){
        auth.signOut();
       }
  }
  return (
    <div className="header">
      <Link to="/">  <img
        className="header_logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt=""
        srcSet=""
      /></Link>
    
      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav" onClick={handleAuthentication}>
        <Link to ={!user&& '/login'}>  <div className="header_option">
          <span className="header_optionLineOne">Hello {!user?"Guest":user.email}</span>
          <span className="header_optionLineTwo">{user?"SignOut":"signIn"}</span>
        </div></Link>
      
        <div className="header_option">
          <span className="header_optionLineOne">Return</span>
          <span className="header_optionLineTwo">& orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
      </div>
      <Link to="/checkout"><div className="header_optionBasket">
        <ShoppingBasketIcon/>
        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
      </div></Link>
      
    </div>
  );
}

export default Header;
