import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    messageForm: {
        display: 'flex',
        position: 'fixed',
        top: `calc(100vh - 21px)`,
        width: `calc(100vw - 240px)`
    },
    messageFormHide: {
        display: 'none',
    },
    messageFormInput: {
        flexGrow: 1,
    },
    messageFormButton: {
        width: '20vw',
        textAlign: 'center',
    },
}));

function MessageForm(props) {
    const [value, setValue] = useState('');
    const classes = useStyles();

    const checkInputVisibility = () => {
        if(props.chatId === undefined) {
            return (classes.messageFormHide);
        } else {
            return (classes.messageForm);
        } 
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    
    const sendUserMessage = () => {
        let newMessage = {
                id: Math.round(Math.random() * (1000 - 1) + 1),
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

    const inputRef = React.createRef();

    useEffect(() => {
        inputRef.current?.focus();
    });

    return (
        <div className={checkInputVisibility()}>
            <input ref={inputRef} className={classes.messageFormInput} type="text" value={value} onChange={handleChange} onKeyDown={checkKey}/>
            <button className={classes.messageFormButton} type="button" onClick={sendUserMessage}>Отправить</button>
        </div>
    )
}

export default MessageForm