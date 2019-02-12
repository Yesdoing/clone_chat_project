import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from 'Components/Header';
import List from 'Routes/List';
import Chat from 'Routes/Chat';

export default () => (
    <Router>
        <>
        <Header />
        <Switch>
            <Route path="/" exact component={List} />
            <Route path="/chat/:id" exact component={Chat} />
            <Redirect from="*" to="/" />
        </Switch>
        </>
    </Router>
);