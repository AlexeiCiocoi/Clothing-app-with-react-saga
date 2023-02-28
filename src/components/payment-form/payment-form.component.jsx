import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";

import Button from "../button/button.component";
import { FormContainer, PaymentFormContainer } from "./payment-form.styles";
const PaymentFrom = () => {
    const stripe= useStripe();
    const elements = useElements();

    const paymentHandler = (e) =>{
        e.preventDefault()
        if(!stripe || !elements) return;
        
        
    }


  return (
    <PaymentFormContainer>
      <h2> Credit card Payment:</h2>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <Button buttonType={"inverted"}> Pay now </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentFrom;
