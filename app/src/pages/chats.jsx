import { useState, useEffect } from 'react';
import Panel from '../components/Panel/panel';
import generateBotPhrase from '../components/BotPhrase/botPhrase';
import { useParams } from 'react-router-dom';
import generateInitialChats from '../components/ChatList/generateInitialChats';
import generateChatList from '../components/ChatList/generateChatList';
import addChat from '../components/ChatList/addChat';

let numberChats = 10;
let inputVisibility = false;

let initialChats = generateInitialChats(numberChats);
let chatsList = generateChatList(numberChats);

function Chats() {  
    const [messageList, setMessageList] = useState([]);
    const { chatId } = useParams();
    const [chats, setChats] = useState(initialChats);
    const [chatList, setChatList] = useState(chatsList);
    
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

    const addMessage = (newMessage) => {
        initialChats[chatId].messages.push(newMessage);
        setMessageList(prevMessageList => prevMessageList.concat(newMessage));
    }

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

    const plusChat = () => {
        numberChats++;
        setChats(generateInitialChats(numberChats));
        let newChatList = chatList.concat(addChat(numberChats));
        setChatList(newChatList);
    };
//TODO переработать удаление
//как вариант присвоить chatId значение undefined
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
