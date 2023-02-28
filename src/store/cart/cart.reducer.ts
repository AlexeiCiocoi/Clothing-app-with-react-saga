import { CartItem } from "./cart.types";
import { AnyAction } from "redux";
import { setIsCartOpen, setCartItems } from "./cart.action";

export type CartInitialState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

const initialState: CartInitialState = {
  isCartOpen: false,
  cartItems: [],
};

export const CartReducer = (
  state = initialState,
  action: AnyAction
): CartInitialState => {
  
  if (setIsCartOpen.match(action))
    return { ...state, isCartOpen: action.payload };

  if (setCartItems.match(action))
    return { ...state, cartItems: action.payload };

  return state;
};
