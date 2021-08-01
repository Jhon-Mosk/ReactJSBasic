import { useState, useEffect, createContext } from 'react';
import ChatsPanel from '../../components/ChatsPanel/chatsPanel';
import generateBotPhrase from '../../components/BotPhrase/botPhrase';
import { useParams } from 'react-router-dom';
import generateInitialChats from '../../components/ChatList/generateInitialChats';
import generateChatList from '../../components/ChatList/generateChatList';
import addChat from '../../components/ChatList/addChat';
import addInitialChat from '../../components/ChatList/addInitialChat';
import MessagesContext from './context/MessagesContext';

let numberChats = 10; // количество чатов
let inputVisibility = false; //видимость поля ввода

let initialChats = generateInitialChats(numberChats); //объект 
let chatsList = generateChatList(numberChats); //массив чатов

function Chats() {  
    const { chatId } = useParams();
    const [chats, setChats] = useState(initialChats);
    const [chatList, setChatList] = useState(chatsList);
    
    //проверка chatId для отображения сообщений
    const checkChatId = (chatId) => {
        if(chatId === undefined || (chatId.slice(2) >= numberChats) || chats[chatId] === undefined) {
            inputVisibility = false;
            return (
                []
            )
        } else {
            inputVisibility = true;
            return (
                chats[chatId].messages
            );
        }
    };
    

    return (
        <div className="App">
            <header className="App-header">
                <MessagesContext.Provider value={checkChatId(chatId)}>
                    <ChatsPanel />
                </MessagesContext.Provider>
            </header>
        </div>
    );
}

export default Chats;
