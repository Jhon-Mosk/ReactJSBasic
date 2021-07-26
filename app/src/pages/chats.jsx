import { useState, useEffect } from 'react';
import Panel from '../components/Panel/panel';
import generateBotPhrase from '../components/BotPhrase/botPhrase';
import { useParams } from 'react-router-dom';
import generateInitialChats from '../components/ChatList/initialChats';

const initialChats = generateInitialChats();

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
        if(chatId === undefined) {
            return (
                []
            )
        } else {
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
                    chatId={chatId}
                    messages={checkChatId(chatId)}
                />
            </header>
        </div>
    );
}

export default Chats;
