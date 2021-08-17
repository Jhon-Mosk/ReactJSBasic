import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { getMessageList } from '../../store/messages';

export default function RenderCurrentMessages() {
    const messageList = useSelector(getMessageList);

    const { chatId } = useParams();

    const currentMessages = messageList[chatId];
    
    useEffect (() => {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        window.scrollBy(0,scrollHeight)
    }, [chatId, currentMessages])

    const exstractAuthor = (item) => {
        for(let value in item) {
            return value
        }
    }

    const exstractMessage = (item) => {
        for(let value in item) {
            return item[value]
        }
    }

    return (
        <>{currentMessages.map((item, index) => <div key={messageList.messageId[index]}>{exstractAuthor(item)}: {exstractMessage(item)}</div>)}</>
    )
}
