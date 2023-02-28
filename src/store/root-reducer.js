import { combineReducers } from "redux";
import { CartReducer } from "./cart/cart.reducer";
import { CategoriesReducer } from "./categories/categories.reducer";
import { UserReducer } from "./user/user.reducer";



export const rootReducers = combineReducers({
    cart: CartReducer,
    user: UserReducer,
    categories: CategoriesReducer
    
});