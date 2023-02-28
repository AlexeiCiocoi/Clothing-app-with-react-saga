import {
  CATEGORY_ACTION_TYPES as actionTypes,
  Categories,
} from "./categories.types";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<actionTypes.FETCH_CATEGORIES>;

export type FetchCategoriesSuccess = ActionWithPayload<
  actionTypes.FETCH_CATEGORIES_SUCCESS,
  Categories[]
>;

export type FetchCategoriesFail = ActionWithPayload<
  actionTypes.FETCH_CATEGORIES_FAILED,
  Error
>;

export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFail;
 
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart => createAction(actionTypes.FETCH_CATEGORIES)
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Categories[]): FetchCategoriesSuccess =>
    createAction(actionTypes.FETCH_CATEGORIES_SUCCESS, categoriesArray)
);

export const fetchCategoriesError = withMatcher(
  (error: Error): FetchCategoriesFail =>
    createAction(actionTypes.FETCH_CATEGORIES_FAILED, error)
);
