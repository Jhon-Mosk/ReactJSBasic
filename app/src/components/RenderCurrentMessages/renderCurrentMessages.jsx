import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { db } from '../../api/firebase';
import { getProfileName } from '../../store/profile/selectors';

export default function RenderCurrentMessages() {
    const profileName = useSelector(getProfileName);

    const { chatId } = useParams();

    const [messages, setMessages] = useState([]);
    const [messageId, setMessageId] = useState([]);

    useEffect(() => {
        db.ref("messages").child(chatId).on("value", (snapshot) => {
            const newMessages = [];
            const newMessageId = [];

            snapshot.forEach((entry) => {
                newMessages.push(entry.val());
                newMessageId.push(entry.key);   
            });     
            console.log(newMessages);
            setMessageId(newMessageId);
            setMessages(newMessages);
        });
    }, [chatId]);

    useEffect (() => {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        window.scrollBy(0,scrollHeight)
    }, [chatId, messages])

    return (
        <>{messages.map((item, index) => <div key={messageId[index]}>{profileName}: {item[profileName]}</div>)}</>
    )
}
