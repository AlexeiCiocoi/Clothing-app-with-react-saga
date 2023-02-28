export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
  SET_CART_TOTAL = "cart/SET_CART_TOTAL",
  SET_CART_COUNT = "cart/SET_CART_COUNT",
}

export type Product = {
  name: string;
  id: number;
  price: number;
  imgUrl: string;
};

export type CartItem = Product & { quantity: number };
