import React from 'react';
import ListPresenter from './ListPresenter';

export default class extends React.Component {
    state = {
        list: null,
    }

    render() {
        const { list } = this.state;
        return <ListPresenter list={list} />;
    }
}