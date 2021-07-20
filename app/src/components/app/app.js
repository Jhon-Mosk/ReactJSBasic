import { useState, useEffect } from 'react';
import './app.css';
import Input from '../Input/input'
import Button from '../Button/button'
import Render from '../Render/render'

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

    // useEffect ( () => console.log(messageList),
    //     [messageList]
    // );

    return (
        <div className="App">
            <header className="App-header">
                My First React App
                <Input userMessage={userMessage} setUserMessage={setUserMessage}></Input>
                <Button messageList={messageList} setMessageList={setMessageList} userMessage={userMessage}></Button>
                <Render messageList={messageList}></Render>
            </header>
        </div>
    );
}

export default App;
