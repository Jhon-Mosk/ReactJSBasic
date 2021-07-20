function Render(props) {
    return (
        <div>{props.messageList.map((item, index) => <div key={index}>{item.author}: {item.text}</div>)}</div>
    )
}

export default Render