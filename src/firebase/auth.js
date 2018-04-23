import { auth } from './firebase';

// Signup
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Signin
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Signout
export const doSignOut = () =>
  auth.signOut();

// Reset Password
export const resetPassword = (email) =>
  auth.sendPasswordResetEmail(email);

// Change Password
export const changePassword = (password) =>
  auth.currentUser.updatePassword(password);