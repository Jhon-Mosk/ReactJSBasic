import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { getMessageList } from '../../store/messages/selectors';
import { useEffect } from 'react';

export default function RenderCurrentMessages() {
    const messageList = useSelector(getMessageList, shallowEqual);
    const { chatId } = useParams();

    useEffect (() => {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        window.scrollBy(0,scrollHeight)
    }, [chatId, messageList])

    function isEmpty(obj) {
        for (let key in obj) {
            // если тело цикла начнет выполняться - значит в объекте есть свойства
            return false;
        }
        return true;
    }

    const checkMessageListEmpty = (messageList) => {
        if(messageList[chatId] == undefined || isEmpty(messageList)) {
            return (
                []
            )
        }
        else {
            return (
                messageList[chatId]
            );
        }
    };

    return (
        <>{checkMessageListEmpty(messageList).map((item) => <div key={item.id}>{item.author}: {item.message}</div>)}</>
    )
}
