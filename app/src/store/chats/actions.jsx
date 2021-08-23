import Faker from 'faker';

import { db } from '../../api/firebase';

export const ADD_CHAT = "ADD_CHAT";
export const REMOVE_CHAT = "REMOVE_CHAT";

const getFreeChatId = () => {
    const newChats = [];
    const chatIdList = [];

    db.ref("chats").on("value", (snapshot) => {

        snapshot.forEach(entry => {
            newChats.push(entry.val());
            chatIdList.push(entry.key);
        });
    });

    let idNumber = 0;
    for (let item of chatIdList) {
        if (item.slice(2) == idNumber) {
            idNumber++;
        }
    }

    return `id${idNumber}`
};

export const createAddChat = (id, newChatName) => async (dispatch) => {
    let chatId = getFreeChatId();
    let name = Faker.name.firstName();
    let avatar = Faker.image.avatar();

    db.ref("chats").child(chatId).child(id).child("name").set(newChatName || name);
    db.ref("chats").child(chatId).child(id).child("avatar").set(avatar);

    dispatch({
        type: ADD_CHAT,
        payload: {
            name: newChatName || name,
            avatar: avatar,
            id: chatId,
        },
    })
};

export const createRemoveChat = (id) => async (dispatch) => {
    db.ref("chats").child(id).remove();
    
    dispatch({
        type: REMOVE_CHAT,
        payload: { id },
    })
};
