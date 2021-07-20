function Button(props) {
    const sendUserMessage = () => {
        props.setMessageList(props.messageList.concat(props.userMessage));
    }

    return (
        <button type="button" onClick={sendUserMessage}>Отправить</button>
    )
}

export default Button