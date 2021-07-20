import { useState, useEffect } from 'react';
import './app.css';
import Render from '../Render/render'
import MessageForm from '../MessageForm/messageForm'

function App(props) {
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        if(messageList.length > 0 && messageList[messageList.length-1].author !== 'Бот') {
            setTimeout(() => {
                addMessage(botMessage);
            }, 1500);

            let botMessage = {
                id: Math.random() * (1000 - 1) + 1,
                author: 'Бот',
                text: 'Не устал по кнопкам тыкать?',
            };
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
                My First React App
                <MessageForm addMessage={addMessage}></MessageForm>
                <Render messageList={messageList}></Render>
            </header>
        </div>
    );
}

export default App;
