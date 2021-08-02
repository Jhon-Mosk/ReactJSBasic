export const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";
export const CHANGE_USER_NAME = "CHANGE_USER_NAME";
export const CHANGE_USER_IMAGE = "CHANGE_USER_IMAGE";
export const CHANGE_USER_SRC_IMAGE = "CHANGE_USER_SRC_IMAGE";

export const createChangeUserStatus = {
    type: CHANGE_USER_STATUS,
};

export const createChangeUserName = (newName) => ({
    type: CHANGE_USER_NAME,
    payload: newName,
});

export const createChangeUserImage = (file) => ({
    type: CHANGE_USER_IMAGE,
    payload: file,
});

export const createChangeUserSrcImage = (srcImage) => ({
    type: CHANGE_USER_SRC_IMAGE,
    payload: srcImage,
});