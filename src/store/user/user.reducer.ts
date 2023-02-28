import { USER_ACTION_TYPES as actionTypes } from "./user.types";
import { AnyAction } from "redux";
import {
  signInSuccess,
  signUpFail,
  signInFail,
  signOutFail,
  signOutSuccess,
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const userInitialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const UserReducer = (
  state = userInitialState,
  action: AnyAction
): UserState => {

  if (signInSuccess.match(action))
    return { ...state, currentUser: action.payload, isLoading: false };

  if (signOutSuccess.match(action))
    return { ...state, currentUser: null, isLoading: false };

  if (
    signUpFail.match(action) ||
    signInFail.match(action) ||
    signOutFail.match(action)
  )
    return { ...state, error: action.payload };
  return state;
};
