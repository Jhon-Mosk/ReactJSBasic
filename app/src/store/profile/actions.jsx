export const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";
export const CHANGE_USER_NAME = "CHANGE_USER_NAME";

export const createChangeUserStatus = {
    type: CHANGE_USER_STATUS,
};

export const createChangeUserName = (newName) => ({
    type: CHANGE_USER_NAME,
    payload: newName,
});