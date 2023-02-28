import { all, call, put, takeLatest } from "typed-redux-saga";
import {
  createUserDocFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInfo,
} from "../../utils/firebase/firebase.utils";
import { EmailAndPasswordSignUp, EmailSignInStart } from "./user.action";
import { User } from "firebase/auth";
import {
  signInSuccess,
  signInFail,
  signUpFail,
  signOutFail,
  SignUpSuccess,
  signOutSuccess,
  signUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES as actionTypes } from "./user.types";

export function* getUserSnapshotFromAuth(
  userAuth: User,
  additionalOptions?: AdditionalInfo
) {
  try {
    const userSpanShot = yield* call(
      createUserDocFromAuth,
      userAuth,
      additionalOptions
    );
    if (userSpanShot) {
      yield* put(
        signInSuccess({ id: userSpanShot.id, ...userSpanShot.data() })
      );
    }
  } catch (e) {
    yield* put(signInFail(e as Error));
  }
}

// Entry points
export function* onCheckUserSession() {
  yield* takeLatest(actionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignIn() {
  yield* takeLatest(actionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignIn() {
  yield* takeLatest(actionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onEmailSignUp() {
  yield* takeLatest(actionTypes.EMAIL_SIGN_UP_START, signUpWithEmail);
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  try {
    yield* call(getUserSnapshotFromAuth, user, additionalDetails);
  } catch (e) {
    yield* put(signUpFail(e as Error));
  }
}

export function* onSignUpSuccess() {
  yield* takeLatest(actionTypes.EMAIL_SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOutStart() {
  yield* takeLatest(actionTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (e) {
    yield* put(signOutFail(e as Error));
  }
}

export function* signUpWithEmail({
  payload: { email, password, displayName },
}: EmailAndPasswordSignUp) {
  try {
    const userCredential = yield* call( 
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    
    if (userCredential) {
      const { user } = userCredential;
      
     
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (e) {
    yield* put(signInFail(e as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getUserSnapshotFromAuth, user);
    }
  } catch (e) {
    yield* put(signInFail(e as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getUserSnapshotFromAuth, userAuth);
  } catch (e) {
    yield* put(signInFail(e as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getUserSnapshotFromAuth, user);
  } catch (e) {
    yield* put(signInFail(e as Error));
  }
}

export function* userSagas() {
  yield *
    all([
      call(onGoogleSignIn),
      call(onCheckUserSession),
      call(onEmailSignIn),
      call(onEmailSignUp),
      call(onSignUpSuccess),
      call(signOutStart),
    ]);
}
