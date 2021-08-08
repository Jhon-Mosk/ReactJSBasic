import { useContext } from "react";
import MessagesContext from '../../pages/Chats/context/MessagesContext';

export default function RenderCurrentMessages(props) {
    const contextValue = useContext(MessagesContext);
    return (
        <>{contextValue.map((item) => <div key={item.id}>{item.author}: {item.text}</div>)}</>
    )
}
