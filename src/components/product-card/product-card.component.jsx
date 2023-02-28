import Button from "../button/button.component";
import "./product-card.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => {
    const newItem = addItemToCart(cartItems, product);
    console.log("new item ", product);
    dispatch(newItem);
  };

  const { name, imageUrl, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={() => addProductToCart()}>
        ADD TO CARD
      </Button>
    </div>
  );
};

export default ProductCard;
