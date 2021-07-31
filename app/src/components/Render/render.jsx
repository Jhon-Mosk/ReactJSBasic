function Render(props) {
    return (
        <>{props.messageList.map((item) => <div key={item.id}>{item.author}: {item.text}</div>)}</>
    )
}

export default Render