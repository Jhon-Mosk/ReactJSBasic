import Faker from 'faker';
//для добавления одного нового чата
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