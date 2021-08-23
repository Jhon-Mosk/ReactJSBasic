import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import firebase from "firebase";

import { createAddMessage, initMessageTracking } from '../../store/messages/actions';
import { getProfileName } from '../../store/profile/selectors';
import { createHideMessageForm, createShowMessageForm } from '../../store/messageForm';
import { getChatList } from '../../store/chats';

import generateBotPhrase from '../../components/BotPhrase/botPhrase';
import MessageForm from '../../components/MessageForm/messageForm';

import { checkKeyOnEnter } from '../../utils/checkKeyOnEnter';
import generateIdFromDate from '../../utils/generateIdFromDate';

function MessageFormContainer() {
    const profileName = useSelector(getProfileName);
    const chatList = useSelector(getChatList);
    const user = firebase.auth().currentUser;

    const [value, setValue] = useState('');

    const { chatId } = useParams();
    
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const getBotName = () => {
        let botData = chatList.filter((item) => item.id === chatId);
        return botData[0].name
    }

    //ответ бота на каждое сообщение WithThunk
    const sendUserMessageWithThunk = (chatId, id, author, message) => (dispatch, getState) => {
        dispatch(createAddMessage(chatId, id, author, message));
        if (author !== 'Бот') {                   
            let botMessage = {
                id: id + 1,
                author: getBotName(),
                text: generateBotPhrase(),
            };
            setTimeout(() => dispatch(createAddMessage(chatId, botMessage.id, botMessage.author, botMessage.text)), 1500);
        }
    };

    //отправляем сообщение в хранилище WithThunk
    const sendUserMessage = useCallback((message) => { 
        let messageId = generateIdFromDate();
        dispatch(sendUserMessageWithThunk(chatId, messageId, user.displayName || profileName, message));
        setValue('');
    }, [chatId, dispatch, user.displayName, profileName]);

    useEffect(() => {
        dispatch(initMessageTracking());
    }, []);

    //проверяем нажат ли энтер в поле ввода, если нажат отправляем сообщение
    const checkKey = (event) => {
        if (checkKeyOnEnter(event.code)) {
            sendUserMessage(value);
        };
    }
    //скрыть форму
    const hideMessageForm = () => {
        dispatch(createHideMessageForm())
    }

    //показать форму
    const showMessageForm = () => {
        dispatch(createShowMessageForm())
    }

    return (
        <MessageForm
            chatId={chatId}
            chatList={chatList}
            value={value}
            hideMessageForm={hideMessageForm}
            showMessageForm={showMessageForm}
            handleChange={handleChange}
            checkKey={checkKey}
            sendUserMessage={() => sendUserMessage(value)}
        />
    )
}

export default MessageFormContainer