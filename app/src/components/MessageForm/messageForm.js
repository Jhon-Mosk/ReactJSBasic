import React, { useState } from 'react';

function MessageForm(props) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <input type="text" value={value} onChange={handleChange} />
            <button type="button" onClick={props.onClick}>Отправить</button>
            <textarea value={value} rows="10"></textarea>
        </div>
    )
}

export default MessageForm;
