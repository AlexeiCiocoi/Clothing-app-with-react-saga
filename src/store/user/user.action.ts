import { USER_ACTION_TYPES as actionTypes } from "./user.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { AdditionalInfo, UserData } from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

export type UserEmailSignUp = UserEmailAndPassword & {
  displayName: string;
};

export type UserEmailAndPassword = {
  email: string;
  password: string;
};

export type CheckUserSession = Action<actionTypes.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<actionTypes.GOOGLE_SIGN_IN_START>;

export type EmailAndPasswordSignUp = ActionWithPayload<
  actionTypes.EMAIL_SIGN_UP_START,
  UserEmailSignUp
>;

export type SignUpSuccess = ActionWithPayload<
  actionTypes.EMAIL_SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInfo }
>;

export type EmailSignInStart = ActionWithPayload<
  actionTypes.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
  actionTypes.SIGN_IN_SUCCESS,
  UserData
>;
export type SignUpFail = ActionWithPayload<
  actionTypes.EMAIL_SIGN_UP_FAIL,
  Error
>;
export type SignInFail = ActionWithPayload<actionTypes.SIGN_IN_FAIL, Error>;
export type SignOutSuccess = Action<actionTypes.SIGN_OUT_SUCCESS>;
export type SignOutFail = ActionWithPayload<actionTypes.SIGN_OUT_FAIL, Error>;
export type SignOutStart = Action<actionTypes.SIGN_OUT_START>;
export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(actionTypes.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
  return createAction(actionTypes.GOOGLE_SIGN_IN_START);
});

export const emailAndPasswordSignUp = withMatcher(
  (
    email: string,
    password: string,
    displayName: string
  ): EmailAndPasswordSignUp =>
    createAction(actionTypes.EMAIL_SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInfo): SignUpSuccess =>
    createAction(actionTypes.EMAIL_SIGN_UP_SUCCESS, { user, additionalDetails })
);
export const signUpFail = withMatcher(
  (error: Error): SignUpFail =>
    createAction(actionTypes.EMAIL_SIGN_UP_FAIL, error)
);

export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccess =>
    createAction(actionTypes.SIGN_IN_SUCCESS, user)
);

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(actionTypes.EMAIL_SIGN_IN_START, { email, password })
);

export const signInFail = withMatcher(
  (error: Error): SignInFail => createAction(actionTypes.SIGN_IN_FAIL, error)
);

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(actionTypes.SIGN_OUT_SUCCESS)
);

export const signOutFail = withMatcher(
  (error: Error): SignOutFail => createAction(actionTypes.SIGN_OUT_FAIL, error)
);

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(actionTypes.SIGN_OUT_START)
);
