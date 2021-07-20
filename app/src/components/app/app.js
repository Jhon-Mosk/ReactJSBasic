import { useState, useEffect } from 'react';
import './app.css';
import MessageForm from '../MessageForm/messageForm'

// Добавить в компонент App поле стейта messageList. В нем хранить массив 
// объектов - сообщений (объект должен содержать, как минимум, поля text и author). 
// Начальное значение - пустой массив).
// 2. Рендерить список сообщений через map.
// 3. Добавить и стилизовать форму - поле для ввода текста и кнопка для отправки сообщения.
//  При отправке сообщения обновление UI должно происходить за счет обновления стейта App.
// 4. Добавить в App useEffect - на каждое отправленное пользователем сообщение должен
//  отвечать робот (должно автоматически отправляться сообщение с фиксированным текстом)
//   - для этого необходимо проверять автора последнего сообщения.
// 5. * Сделать задержку ответа робота - сообщение от него должно отправляться
//  через некоторый промежуток времени после отправки сообщения пользователя (напр., 1.5 сек).

function App(props) {
    const [messageList, setMessageList] = useState([]);
    const [userMessage, setUserMessage] = useState({});

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    // {
    //     date: new Date,
    //     author: 'fghg',
    //     text: event.target.value,
    // }
    // const message = messageList.map((item, index) => <div key={index}>{item.author}: {item.text}</div>);

    // useEffect ( () => console.log(messageList),
    //     [messageList]
    // );
    function Input(props) {
        return (
            <input type="text" onChange={handleChange} />
        )
    }

    function Button(props) {
        return (
            <button type="button" onClick={sendUserMessage}>Отправить</button>
        )
    }

    const sendUserMessage = () => {
        console.log(messageList)
        setMessageList((prevMessageList) => prevMessageList.concat([userMessage]));
    }

    const handleChange = (event) => {
        let newMessage = {
                author: 'Я',
                text: event.target.value,
            };
        setUserMessage(Object.assign(userMessage, newMessage));
    }

    return (
        <div className="App">
            <header className="App-header">
                My First React App
                <Input></Input>
                <Button></Button>
                <div>{messageList.map((item, index) => <div key={index}>{item.author}: {item.text}</div>)}</div>
            </header>
        </div>
    );
}

export default App;
