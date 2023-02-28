import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartInitialState } from "./cart.reducer";

const selectCartReducer = (state: RootState): CartInitialState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartIsOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (totalPrice, product) => totalPrice + product.price * product.quantity,
    0
  )
);
