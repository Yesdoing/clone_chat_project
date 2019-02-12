import React from 'react';
import ListPresenter from './ListPresenter';
import { richWebApi } from 'lib/api';
import moment from "moment";

export default class extends React.Component {
    state = {
        list: [],
        error: null,
        loading: true
    }

    componentDidMount() {
        try{
            const { list } = richWebApi.list();
            this.setState({
                list
            });
        } catch(error) {
            this.setState({
                error: "Sorry I can't get Chating List"
            });
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    isToday = date => {
        const today = moment().format("YYYY MMM DD,ddd");
        if (date.includes(today)) {
          return date.substring(date.length - 5, date.length);
        }
        return date.split(",")[1];
    };

    render() {
        const { list, error, loading } = this.state;
        return <ListPresenter list={list} error={error} loading={loading} isToday={this.isToday} />;
    }
}