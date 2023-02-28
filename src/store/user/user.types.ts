export const SET_CURRENT_USER = "SET_CURRENT_USER";

export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = "user/SET_CURRENT_USER",
  CHECK_USER_SESSION = "user/CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START = "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START",
  EMAIL_SIGN_UP_START = "user/EMAIL_SIGN_UP_START",
  EMAIL_SIGN_UP_SUCCESS = "user/EMAIL_SIGN_UP_SUCCESS",
  EMAIL_SIGN_UP_FAIL = "user/EMAIL_SIGN_UP_FAIL",
  SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAIL = "user/SIGN_IN_FAIL",
  SIGN_OUT_START = "user/SIGN_OUT_START",
  SIGN_OUT_SUCCESS = "user/SIGN_OUT_SUCCESS",
  SIGN_OUT_FAIL = "user/SIGN_OUT_FAIL",
};