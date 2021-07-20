function Input(props) {
    const handleChange = (event) => {
        let newMessage = {
                id: Math.random(),
                author: 'Я',
                text: event.target.value,
            };
        props.setUserMessage(Object.assign(props.userMessage, newMessage));
    }

    return (
        <input type="text" onChange={handleChange} />
    )
}

export default Input