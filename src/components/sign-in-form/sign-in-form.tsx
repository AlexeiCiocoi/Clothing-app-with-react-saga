import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useState , FormEvent,ChangeEvent } from "react";


import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

const defaultFormVal = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formVal, setFormVal] = useState(defaultFormVal);
  const { email, password } = formVal;
  const dispatch = useDispatch();

  const resetFormFields = ()=>{
    setFormVal(defaultFormVal)
  }
  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try{
      dispatch(emailSignInStart(email,password))
      resetFormFields()
    }catch(e){
      console.log(e)
    }
    
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormVal({ ...formVal, [name]: value });
  };

  return (
    <SignInContainer className="sign-up-container">
      <span>Sign in with email & password</span>
      <form onSubmit={ handleSubmit}>
        <FormInput
          onChange={handleChange}
          value={email}
          name="email"
          required
          type="text"
          label="Email"
        />
        <FormInput
          onChange={handleChange}
          value={password}
          name="password"
          required
          type="password"
          label="Password"
        />
        <ButtonsContainer className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>
            Sign in with google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
