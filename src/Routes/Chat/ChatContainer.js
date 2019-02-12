import React from 'react';
import ChatPresenter from './ChatPresenter';

export default class extends React.Component {
    state = {
        list: null,
    }

    render() {
        const { list } = this.state;
        return <ChatPresenter list={list} />;
    }
}