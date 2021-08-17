import { db } from "../../api/firebase";

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGES = 'REMOVE_MESSAGES';

const getPayloadFromSnapshot = (snapshot) => {
    const messages = [];
    const messageId = [];

    snapshot.forEach((mes) => {
        messages.push(mes.val());
        messageId.push(mes.key);
    });
    
    return {chatId: snapshot.key, messageId, messages};
}

export const createAddMessage = (chatId, id, author, message) => async () => {
    db.ref("messages").child(chatId).child(id).child(author).set(message);
};

export const initMessageTracking = () => (dispatch) => {
    db.ref("messages").on("child_changed", (snapshot) => {
        const payload = getPayloadFromSnapshot(snapshot);

        dispatch({
            type: ADD_MESSAGE,
            payload,
        });
    });

    db.ref("messages").on("child_added", (snapshot) => {
        const payload = getPayloadFromSnapshot(snapshot);

        dispatch({
            type: ADD_MESSAGE,
            payload,
        })
    })
}

export const createRemoveMessages = (chatId) => ({
    type: REMOVE_MESSAGES,
    payload: {
        chatId,
    },
});

