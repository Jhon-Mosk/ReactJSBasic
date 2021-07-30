import { useState, useEffect, createContext } from 'react';
import Panel from '../components/Panel/panel';
import generateBotPhrase from '../components/BotPhrase/botPhrase';
import { useParams } from 'react-router-dom';
import generateInitialChats from '../components/ChatList/generateInitialChats';
import generateChatList from '../components/ChatList/generateChatList';
import addChat from '../components/ChatList/addChat';
import addInitialChat from '../components/ChatList/addInitialChat';

let numberChats = 10; // количество чатов
let inputVisibility = false; //видимость поля ввода

let initialChats = generateInitialChats(numberChats); //объект 
let chatsList = generateChatList(numberChats); //массив чатов

function Chats() {  
    const [messageList, setMessageList] = useState([]);
    const { chatId } = useParams();
    const [chats, setChats] = useState(initialChats);
    const [chatList, setChatList] = useState(chatsList);
    //ответ бота на каждое сообщение
    useEffect(() => {
        if (messageList.length > 0 && messageList[messageList.length - 1].author !== 'Бот') {
            let botMessage = {
                id: Math.round(Math.random() * (1000 - 1) + 1),
                author: 'Бот',
                text: generateBotPhrase(),
            };

            setTimeout(() => {
                addMessage(botMessage);
            }, 1500);
        }
    },
        [messageList]
    );
    //отправка сообщений
    const addMessage = (newMessage) => {
        chats[chatId].messages.push(newMessage);
        setMessageList(prevMessageList => prevMessageList.concat(newMessage));
    }
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
    //добавление нового чата
    const plusChat = () => {
        numberChats++;
        let newInitialChat = addInitialChat(numberChats);
        let newChats = {...chats, ...newInitialChat};
        setChats(newChats);
        
        let newChatList = chatList.concat(addChat(numberChats));
        setChatList(newChatList);
    };

    //удаление чата
    const deleteChat = (event) => {
        let newChats = {};
        for(let item in chats) {
            if(item != event.target.parentElement.id && item != event.target.id) {
                newChats[item] = {...chats[item]};
            };
        };
        setChats(newChats);

        let newChatList= [];
        for(let item of chatList) {
            if(item.id != event.target.parentElement.id && item.id != event.target.id) {
                newChatList.push(item);
                    };
        }
        setChatList(newChatList);
        
    }

    return (
        <div className="App">
            <header className="App-header">
                <Panel
                    addMessage={addMessage}
                    inputVisibility={inputVisibility}
                    messages={checkChatId(chatId)}
                    chatList={chatList}
                    plusChat={plusChat}
                    deleteChat={deleteChat}
                />
            </header>
        </div>
    );
}

export default Chats;
