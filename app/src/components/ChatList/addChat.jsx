import Faker from 'faker';

export default function addChat(numberChats) {
    const chatList = Array.from({
        length: 1
    }).map(() => ({
        id: 'id' + (numberChats - 1),
        avatar: Faker.image.avatar(),
        name: Faker.name.firstName(),
    }));

    return chatList;
}