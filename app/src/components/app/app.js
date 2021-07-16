import './app.css';
import Message from '../message/message'

function App(props) {
    
    return (
        <div className="App">
            <header className="App-header">
                My First React App
                <h3>Hello, {props.name}</h3>
                <Message text={props.name}/>
            </header>
        </div>
    );
}

export default App;
