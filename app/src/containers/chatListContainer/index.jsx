import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from "react-redux";

import { createRemoveChat } from '../../store/chats/actions';
import { createHideMessageForm, createShowMessageForm } from '../../store/messageForm';
import { getChatList } from '../../store/chats/selectors';
import { createRemoveMessages } from '../../store/messages';

import ChatList from '../../components/ChatList/chatList';

export default function ChatListContainer() {
    const chats = useSelector(getChatList, shallowEqual);
    const dispatch = useDispatch();
    const { chatId } = useParams();

    //удаление чата
    const deleteChat = useCallback((event) => {
        dispatch(createHideMessageForm())
        dispatch(createRemoveChat(event.target.parentElement.id || event.target.id));
        dispatch(createRemoveMessages(event.target.parentElement.id || event.target.id));
    }, [dispatch]);

    //меняет видимость поля ввода
    const changeMessageFormVisibility = useCallback(() => {
        dispatch(createShowMessageForm())
    }, [dispatch]);

    return (
        chats.map((item) => (
            <ChatList
                key={item.id} 
                item={item}
                chatId={chatId}
                changeMessageFormVisibility={changeMessageFormVisibility}
                deleteChat={deleteChat}
            />
        ))
    )
}