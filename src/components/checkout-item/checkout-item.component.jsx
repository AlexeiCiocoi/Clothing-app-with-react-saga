import "./checkout-item.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, decrementCartProduct, removeItemFromCart } from "../../store/cart/cart.action";

const CheckoutItem = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const { id, name, quantity, price, imageUrl } = product;

  const clearItemHandler = () => dispatch(removeItemFromCart(cartItems,product));
  const addItemHandler = () => dispatch(addItemToCart(cartItems,product));
  const removeItemHandler = () => dispatch(decrementCartProduct(cartItems,product));

  return (
    <div className="checkout-item-container" key={id}>
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div onClick={removeItemHandler} className="arrow">
          &#10094;
        </div>
        <span className="value"> {quantity}</span>

        <div onClick={addItemHandler} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
