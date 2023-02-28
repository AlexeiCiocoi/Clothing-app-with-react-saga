import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesError,
} from "./categories.action";
import { AnyAction } from "redux";
import { Categories } from "./categories.types";

export type CategoriesState = {
  readonly categories: Categories[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};
const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const CategoriesReducer = ( 
  state = initialState,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) return { ...state, isLoading: true };

  if (fetchCategoriesSuccess.match(action))
    return { ...state, categories: action.payload, isLoading: false };

  if (fetchCategoriesError.match(action))
    return { ...state, error: action.payload, isLoading: false };

  return state;
};
