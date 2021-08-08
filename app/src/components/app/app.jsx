import React from 'react';
import Chats from '../../pages/Chats/chats'
import Main from '../../pages/main';
import Profile from '../../pages/profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/navigation';

export default function App() {

    return (
        <BrowserRouter>
            <Navigation></Navigation>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/main">
                    <Main />
                </Route>
                <Route path="/chats/:chatId">
                    <Chats />
                </Route>
                <Route exact path="/chats">
                    <Chats />
                </Route>
                <Route path="/chats/:chatId">
                    <Chats />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route>
                    <h3>Page not found</h3>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};