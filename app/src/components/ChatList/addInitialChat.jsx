export default function addInitialChat(numberChats) {
    let initialChats = {};

    for (let i = 0; i < 1; i++) {
        initialChats[i] = {
            ...{
                name: "Chat" + (numberChats - 1),
                messages: [],
            }
        };

    };

    for (let key in initialChats) {
        initialChats["id" + (numberChats - 1)] = initialChats[key];
        delete initialChats[key];
    }

    return initialChats;
}