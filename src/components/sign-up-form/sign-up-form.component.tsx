
import { AuthErrorCodes, AuthError } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { emailAndPasswordSignUp } from "../../store/user/user.action";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-container.styles.tsx'
const defaultFormVal = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = ()=>{
    const [formVal,setFormVal] = useState(defaultFormVal);
    const {displayName,email,password,confirmPassword} = formVal;
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{ 
        const { value , name} = event.target;

        setFormVal({...formVal,[name]: value});
    }

    const resetFormFields = () =>{
        setFormVal(defaultFormVal);
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        if(password !== confirmPassword){
            alert('Incorrect password confirmation');
            return;
        }
        try{
            // const { user } = await createAuthUserWithEmailAndPassword(
            //   email,
            //   password
            // );
            dispatch(emailAndPasswordSignUp(email,password,displayName));
            
            // createUserDocFromAuth(user,{displayName})
           
           
            resetFormFields()
        } catch(error){
           if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) alert('Email already in use')
        }
        

    }

    return (
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign Up with email & password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleChange}
            value={displayName}
            name="displayName"
            required
            type="text"
            label="DisplayName"
          />
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
          <FormInput
            onChange={handleChange}
            value={confirmPassword}
            name="confirmPassword"
            required
            type="password"
            label="Repeat password"
          />
          <div className="buttons-container">
           
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    );
}

export default SignUpForm