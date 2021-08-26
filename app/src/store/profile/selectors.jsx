import firebase from "firebase";

export const getProfileName = state => state.profile.name;

export const getProfile = (state) => state.profile;

export const getCurrentUser = () => firebase.auth().currentUser;
