import { useState, useEffect } from 'react';
import Panel from '../components/Panel/panel';
import generateBotPhrase from '../components/BotPhrase/botPhrase';
import { useParams } from 'react-router-dom';
import generateInitialChats from '../components/ChatList/generateInitialChats';
import generateChatList from '../components/ChatList/generateChatList';

const numberChats = 10;
var inputVisibility = false;

const initialChats = generateInitialChats(numberChats);
const chatList = generateChatList(numberChats);

function Chats() {  
    const [messageList, setMessageList] = useState([]);
    const { chatId } = useParams();
    const [chats, setChats] = useState(initialChats);
    
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
        if(chatId === undefined || (chatId.slice(2) >= numberChats)) {
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
                <Panel
                    addMessage={addMessage}
                    inputVisibility={inputVisibility}
                    messages={checkChatId(chatId)}
                    chatList={chatList}
                />
            </header>
        </div>
    );
}

export default Chats;
