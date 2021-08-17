import firebase from "firebase";

export const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";
export const CHANGE_USER_NAME = "CHANGE_USER_NAME";
export const CHANGE_USER_IMAGE = "CHANGE_USER_IMAGE";
export const CHANGE_USER_SRC_IMAGE = "CHANGE_USER_SRC_IMAGE";

// const user = firebase.auth().currentUser;
//     if (user !== null) {
//         // The user object has basic properties such as display name, email, etc.
//         const displayName = user.displayName;
//         const email = user.email;
//         const photoURL = user.photoURL;
//         const emailVerified = user.emailVerified;

//         // The user's ID, unique to the Firebase project. Do NOT use
//         // this value to authenticate with your backend server, if
//         // you have one. Use User.getToken() instead.
//         const uid = user.uid;
//     }

export const createChangeUserStatus = {
    type: CHANGE_USER_STATUS,
};


export const createChangeUserName = (newName) => async (dispatch) => {
    try {
        await firebase.auth().currentUser.updateProfile({
            displayName: newName,
        })
    } catch(error) {
        console.error(error);
    }
    dispatch({
        type: CHANGE_USER_NAME,
        payload: newName,        
    })
};

export const createChangeUserImage = (file) => ({
    type: CHANGE_USER_IMAGE,
    payload: file,
});

export const createChangeUserSrcImage = (srcImage) => ({
    type: CHANGE_USER_SRC_IMAGE,
    payload: srcImage,
});