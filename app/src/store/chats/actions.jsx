import Faker from 'faker';
import { db } from '../../api/firebase';

import { getCurrentUser } from '../profile/selectors';

export const ADD_CHAT = "ADD_CHAT";
export const REMOVE_CHAT = "REMOVE_CHAT";
export const LOAD_CHATS = "LOAD_CHATS";

const user = () => getCurrentUser();

const getFreeChatId = () => {
    const newChats = [];
    const chatIdList = [];
    db.ref(`chats/${user().uid}`).on("value", (snapshot) => {

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

export const createAddChat = (newChatName) => async (dispatch) => {
    let chatId = getFreeChatId();
    let name = Faker.name.firstName();
    let avatar = Faker.image.avatar();

    db.ref(`chats/${user().uid}`).child(chatId).child("name").set(newChatName || name);
    db.ref(`chats/${user().uid}`).child(chatId).child("avatar").set(avatar);

    dispatch({
        type: ADD_CHAT,
        payload: {
            name: newChatName || name,
            avatar: avatar,
            id: chatId,
        },
    })
};

export const createLoadChats = () => async (dispatch) => {
    let snapshot = await db.ref(`chats/${user().uid}`).get();
    
    const chats = [];
    const chatsId = [];
    const loadedChats = [];

    snapshot.forEach((item) => {
        chats.push(item.val());
        chatsId.push(item.key);       
    });

    for(let item in chats) {
        loadedChats.push({
            name: chats[item].name,
            avatar: chats[item].avatar,
            id: chatsId[item],
        })        
    }

    dispatch({
        type: LOAD_CHATS,
        payload: loadedChats,
    })
}

export const createRemoveChat = (id) => async (dispatch) => {
    db.ref(`chats/${user().uid}`).child(id).remove();
    
    dispatch({
        type: REMOVE_CHAT,
        payload: { id },
    })
};
