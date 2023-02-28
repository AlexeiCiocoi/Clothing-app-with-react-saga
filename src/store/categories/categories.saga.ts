import {put, all, call, takeLatest } from "typed-redux-saga";

import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
} from "./categories.action";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import { CATEGORY_ACTION_TYPES } from "./categories.types";

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES,
    fetchCategoriesAsync
  );
}

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocument);
   
   yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (e) {
   yield* put(fetchCategoriesError(e as Error));
  }
}


export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
