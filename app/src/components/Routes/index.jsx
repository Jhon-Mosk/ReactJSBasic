import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/navigation';

import Chats from '../../pages/chats'
import Main from '../../pages/main';
import Profile from '../../pages/profile';
import Covid19 from '../../pages/covid19';

export const Routes = () => {
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
                <Route path="/covid19">
                    <Covid19 />
                </Route>
                <Route>
                    <h3>Page not found</h3>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}