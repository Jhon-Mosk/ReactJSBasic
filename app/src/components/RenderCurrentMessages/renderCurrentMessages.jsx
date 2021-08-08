import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { getMessageList } from '../../store/messages/selectors';

export default function RenderCurrentMessages() {
    const messageList = useSelector(getMessageList, shallowEqual);
    const { chatId } = useParams();

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
