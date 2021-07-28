import { useState, useEffect } from 'react';
import Panel from '../Panel/panel';
import generateBotPhrase from '../BotPhrase/botPhrase'

function App() {
    const [messageList, setMessageList] = useState([]);



    useEffect(() => {
        if(messageList.length > 0 && messageList[messageList.length-1].author !== 'Бот') {
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
        setMessageList(prevMessageList => prevMessageList.concat(newMessage));
    }

    return (
        <div className="App">
            <header className="App-header">
                <Panel addMessage={addMessage} messageList={messageList}></Panel>
            </header>
        </div>
    );
}

export default App;
