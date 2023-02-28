import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "../categories/categories.types";
import { CART_ACTION_TYPES, Product, CartItem } from "./cart.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: Product
): CartItem[] => {
  const existingProduct = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingProduct) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: Product
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

const decrementCartItem = (cartItems: CartItem[], cartItem: CartItem) => {
  if (cartItem.quantity > 1)
    return cartItems.map((product) =>
      product.id === cartItem.id
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );

  return removeCartItem(cartItems, cartItem);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItem: CartItem
): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, cartItem);
  return setCartItems(newCartItems);
};

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: Product
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const decrementCartProduct = (
  cartItems: CartItem[],
  cartItem: CartItem
): SetCartItems => {
  const newCartItems = decrementCartItem(cartItems, cartItem);
  return setCartItems(newCartItems);
};
