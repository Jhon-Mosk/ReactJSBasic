import Faker from 'faker';

export const ADD_CHAT = "ADD_CHAT";
export const REMOVE_CHAT = "REMOVE_CHAT";

export const createAddChat = () => ({
    type: ADD_CHAT,
    name: Faker.name.firstName(),
    avatar: Faker.image.avatar(),
});

export const createRemoveChat = (id) => ({
    type: REMOVE_CHAT,
    id,
});
