import React from 'react';
import ListPresenter from './ListPresenter';
import { richWebApi } from 'lib/api';
import moment from "moment";

export default class extends React.Component {
    state = {
        chatList: [],
        error: null,
        loading: true
    }

    componentDidMount() {
        try{
            const chatList = richWebApi.chatList();
            this.setState({
                chatList
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

    readMessage = (id) => {
        const { chatList } = this.state;
        const updatedList = chatList.map((item, index) => {
            if (id === index) {
                item.unread_number = 0;
            }
            return item;
        });
        this.setState({
            chatList: updatedList
        });
        richWebApi.updateMessageAllRead(id);
    }

    isToday = date => {
        const today = moment().format("YYYY MMM DD,ddd");
        if (date.includes(today)) {
          return date.substring(date.length - 8, date.length-3);
        }
        return date.split(",")[1];
    };

    render() {
        const { chatList, error, loading } = this.state;
        const { isToday, readMessage } = this;
        return <ListPresenter chatList={chatList} error={error} loading={loading} isToday={isToday} readMessage={readMessage} />;
    }
}