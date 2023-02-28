
import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentFrom from "../../components/payment-form/payment-form.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import "./checkout.styles.scss";


const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block"> Product </div>
        <div className="header-block"> Description </div>
        <div className="header-block"> Quantity </div>
        <div className="header-block"> price </div>
        <div className="header-block">Remove </div>
      </div>
      {cartItems.map((product) => (
        <CheckoutItem key ={product.id} product={product} />
      ))}
      <span className="value">Total : {cartTotal}</span>
      <PaymentFrom />
    </div>
  );
};

export default Checkout;
