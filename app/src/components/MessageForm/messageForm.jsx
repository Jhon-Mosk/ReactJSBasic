import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { getInputVisibility } from '../../store/messageForm/selectors';

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
    const classes = useStyles();
    const inputVisibility = useSelector(getInputVisibility);
    
    //проверям видимость и присваиваем стили
    const checkInputVisibility = () => {
        if (!inputVisibility || props.chatId === undefined) {
            return (classes.messageFormHide);
        } else {
            return (classes.messageForm);
        }
    };

    //проверяется существует ли id введённый в url
    useEffect(() => {
        props.hideMessageForm()
        for(let item of props.chatList) {
            if(props.chatId === item.id) {              
                props.showMessageForm()                
            } 
        } 
    }, [props.chatId])

    const inputRef = React.createRef();
    //автофокус на поле ввода
    useEffect(() => {
        inputRef.current?.focus();
    });

    return (
        <div className={checkInputVisibility()}>
            <input ref={inputRef} className={classes.messageFormInput} type="text" value={props.value} onChange={props.handleChange} onKeyDown={props.checkKey} />
            <button className={classes.messageFormButton} type="button" onClick={props.sendUserMessage}>Отправить</button>
        </div>
    )
}

export default MessageForm