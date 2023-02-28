import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropDown = () => {

  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandle = () =>{
    navigate('/checkout');
  }
   console.log("cartItem", cartItems);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => {
          
          return <CartItem key={cartItem.id} cardItem={cartItem} />;
        })}
        <Button onClick={goToCheckoutHandle}>GO TO CHECKOUT</Button>
      </div>
    </div>
  );
};

export default CartDropDown;
