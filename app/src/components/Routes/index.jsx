import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import firebase from 'firebase';

import { createLoadChats } from '../../store/chats';
import { createLoadMessages } from '../../store/messages';

import PublicRoute from '../../hocs/PublicRoute';
import PrivateRoute from '../../hocs/PrivateRoute';

import Navigation from '../Navigation/navigation';
import { SignUp } from '../SignUp';

import Chats from '../../pages/chats'
import Main from '../../pages/main';
import Profile from '../../pages/profile';
import Covid19 from '../../pages/covid19';

export const Routes = () => {
    const [authed, setAuthed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                setAuthed(true);
                dispatch(createLoadChats());
                dispatch(createLoadMessages());
            } else {
                setAuthed(false);
            }
        })
    }, [])

    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <PublicRoute authenticated={authed} exact path="/">
                    <Main />
                </PublicRoute>
                <PublicRoute authenticated={authed} exact path="/main">
                    <Main />
                </PublicRoute>
                <PublicRoute authenticated={authed} exact path="/login">
                    <Main />
                </PublicRoute>
                <PublicRoute authenticated={authed} exact path="/signup">
                    <SignUp />
                </PublicRoute>               
                <PrivateRoute authenticated={authed} exact path="/chats">
                    <Chats />
                </PrivateRoute>
                <PrivateRoute authenticated={authed} path="/chats/:chatId">
                    <Chats />
                </PrivateRoute>
                <PrivateRoute authenticated={authed} exact path="/profile">
                    <Profile />
                </PrivateRoute>
                <PublicRoute authenticated={authed} path="/covid19">
                    <Covid19 />
                </PublicRoute>
                <Route>
                    <h3>Page not found</h3>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}