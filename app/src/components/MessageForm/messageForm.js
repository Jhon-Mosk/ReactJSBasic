import { useState} from 'react';

function MessageForm(props) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    
    const sendUserMessage = () => {
        let newMessage = {
                id: Math.random() * (1000 - 1) + 1,
                author: 'Я',
                text: value,
            };
        props.addMessage(newMessage);
        setValue('');
    }

    const checkKey = (event) => {
        if(event.code === "Enter") {
            sendUserMessage();
        };
    }

    return (
        <div>
            <input type="text" value={value} onChange={handleChange} onKeyDown={checkKey}/>
            <button type="button" onClick={sendUserMessage}>Отправить</button>
        </div>
    )
}

export default MessageForm