import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

import Navigation from '../Navigation/navigation';

import Chats from '../../pages/chats'
import Main from '../../pages/main';
import Profile from '../../pages/profile';
import Covid19 from '../../pages/covid19';

import { SignUp } from '../../components/SignUp';
import { Login } from '../../components/Login';
import PublicRoute from '../../hocs/PublicRoute';
import PrivateRoute from '../../hocs/PrivateRoute';

export const Routes = () => {
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                setAuthed(true);
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
                    <Main />
                </PublicRoute>
                <PrivateRoute path="/chats/:chatId?">
                    <Chats />
                </PrivateRoute>
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