import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import {  signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartIsOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectCartIsOpen)

  const signOutHandler = async () => {
   
    dispatch(signOutStart());
  };

  return (
    <Fragment>
      <div className="navigatiodivn">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="logo-container" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SING IN
            </Link>
          )}
          <CartIcon />
          { isCartOpen && <CartDropDown /> }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
