import { db } from "../../api/firebase";

import { getCurrentUser } from "../profile/selectors";

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGES = 'REMOVE_MESSAGES';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';

const user = () => getCurrentUser();

const getPayloadFromSnapshot = (snapshot) => {
    const messages = [];
    const messageId = [];

    snapshot.forEach((mes) => {
        messages.push(mes.val());
        messageId.push(mes.key);
    });
    
    return {chatId: snapshot.key, messageId, messages};
}

export const createLoadMessages = () => async (dispatch) => {
    let snapshot = await db.ref(`messages/${user().uid}`).get();  

    let payload = {};
    const messages = [];

    snapshot.forEach((item) => {        
        messages.push(item.val())

        payload = {
            [item.key]: messages
        }
    })

    dispatch({
        type: LOAD_MESSAGES,
        payload,
    })
}

export const createAddMessage = (chatId, id, author, message) => async () => {
    db.ref(`messages/${user().uid}`).child(chatId).child(id).child(author).set(message);
};

export const initMessageTracking = () => (dispatch) => {
    db.ref(`messages/${user().uid}`).on("child_changed", (snapshot) => {
        const payload = getPayloadFromSnapshot(snapshot);
        
        dispatch({
            type: ADD_MESSAGE,
            payload,
        });
    });

    db.ref(`messages/${user().uid}`).on("child_added", (snapshot) => {
        const payload = getPayloadFromSnapshot(snapshot);

        dispatch({
            type: ADD_MESSAGE,
            payload,
        })
    })
}

export const createRemoveMessages = (chatId) => async (dispatch) => {
    db.ref(`messages/${user().uid}`).child(chatId).remove();

    dispatch({
        type: REMOVE_MESSAGES,
        payload: {
            chatId,
        },
    })
}
