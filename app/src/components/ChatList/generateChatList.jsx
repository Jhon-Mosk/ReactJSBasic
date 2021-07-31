import Faker from 'faker';

export default function generateChatList(numberChats) {
    const chatList = Array.from({
        length: numberChats
    }).map((_, index) => ({
        id: 'id' + index,
        avatar: Faker.image.avatar(),
        name: Faker.name.firstName(),
    }));

    return chatList;
}