import Faker from 'faker';

export const ADD_CHAT = "ADD_CHAT";
export const REMOVE_CHAT = "REMOVE_CHAT";

export const createAddChat = (newChatName) => ({
    type: ADD_CHAT,
    payload : {
        name: newChatName || Faker.name.firstName(),
        avatar: Faker.image.avatar(),
    },
});

export const createRemoveChat = (id) => ({
    type: REMOVE_CHAT,
    payload: {id},
});
