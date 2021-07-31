export default function generateInitialChats(numberChats) {
    let initialChats = {};

    for (let i = 0; i < numberChats; i++) {
        initialChats[i] = {
            ...{
                name: "Chat" + i,
                messages: [],
            }
        };

    };

    for (let key in initialChats) {
        initialChats["id" + key] = initialChats[key];
        delete initialChats[key];
    }

    return initialChats;
}
