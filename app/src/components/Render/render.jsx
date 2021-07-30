import { useContext } from "react";
import MessagesContext from '../../pages/Chats/context/MessagesContext';

function Render(props) {
    const contextValue = useContext(MessagesContext);
    return (
        <>{contextValue.map((item) => <div key={item.id}>{item.author}: {item.text}</div>)}</>
    )
}

export default Render