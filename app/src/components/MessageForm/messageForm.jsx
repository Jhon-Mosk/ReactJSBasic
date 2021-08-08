import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createAddMessage } from '../../store/messages/actions';
import { useParams } from 'react-router-dom';
import generateBotPhrase from '../BotPhrase/botPhrase';
import { checkKeyOnEnter } from '../../utils/checkKeyOnEnter';
import { getInputVisibility } from '../../store/messageForm/selectors';
import { getProfileName } from '../../store/profile/selectors';

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

function MessageForm() {
    const classes = useStyles();
    const profileName = useSelector(getProfileName);
    const inputVisibility = useSelector(getInputVisibility);
    const [value, setValue] = useState('');
    const { chatId } = useParams();
    const dispatch = useDispatch();

    const checkInputVisibility = () => {
        if (!inputVisibility || chatId === undefined) {
            return (classes.messageFormHide);
        } else {
            return (classes.messageForm);
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    //отправляем сообщение в хранилище
    const sendUserMessage = useCallback(() => {
        let author = profileName || 'Я';
        dispatch(createAddMessage(chatId, author, value));
        setValue('');
        botAnswer();
    }, [dispatch, chatId, value, profileName]);

    //ответ бота на каждое сообщение
    const botAnswer = useCallback(() => {
        let botMessage = {
            author: 'Бот',
            text: generateBotPhrase(),
        }

        setTimeout(() => {
            dispatch(createAddMessage(chatId, botMessage.author, botMessage.text));;
        }, 1500);

    }, [dispatch, chatId]);

    //проверяем нажат ли энтер в поле ввода, если нажат отправляем сообщение
    const checkKey = (event) => {
        if (checkKeyOnEnter(event.code)) {
            sendUserMessage();
        };
    }

    const inputRef = React.createRef();
    //автофокус на поле ввода
    useEffect(() => {
        inputRef.current?.focus();
    });

    return (
        <div className={checkInputVisibility()}>
            <input ref={inputRef} className={classes.messageFormInput} type="text" value={value} onChange={handleChange} onKeyDown={checkKey} />
            <button className={classes.messageFormButton} type="button" onClick={sendUserMessage}>Отправить</button>
        </div>
    )
}

export default MessageForm