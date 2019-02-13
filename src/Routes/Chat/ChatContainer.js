import React from "react";
import ChatPresenter from "./ChatPresenter";
import { richWebApi } from "lib/api";
import moment from "moment";
import { useUI } from "../../Context/UI";

export default useUI(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        messages: [],
        message: "",
        to_user: {},
        from_user: {},
        error: null,
        loading: true
      };

      this.messageContainer = null;

      this.setMessageContainerRef = element => {
        this.messageContainer = element;
      };

      this.scrollToBottom = () => {
        if (this.messageContainer) {
          const { scrollHeight } = this.messageContainer;
          this.messageContainer.scrollTop = scrollHeight;
        }
      };
    }

    componentDidMount() {
      const {
        match: {
          params: { id }
        },
        history: { push }
      } = this.props;
      const { messageDividerOfDate } = this;
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        return push("/");
      }

      try {
        const data = richWebApi.chat(parsedId);

        let updatedMessages = messageDividerOfDate([...data.messages]);

        this.setState({
          messages: updatedMessages,
          to_user: data.to_user,
          from_user: data.from_user
        });
        this.props.setChatHeaderUsername(data.from_user.username);
      } catch (error) {
        this.setState({
          error:
            "Sorry, Something unexpected error occurred. Didn't not get any Message"
        });
      } finally {
        this.setState({
          loading: false
        });
      }
    }

    setDateFormat = date =>
      date
        .split(",")
        .reduce((acc, cur, index) => (index !== 2 ? `${acc} ${cur}` : acc));

    handleSubmit = event => {
      event.preventDefault();
      const { message } = this.state;
      if (message !== "") {
        this.sendMessage();
      }
    };

    handleChangeInput = event => {
      const {
        target: { value }
      } = event;
      this.setState({
        message: value
      });
    };

    sendMessage = async () => {
      const { message, messages } = this.state;
      let updateMessages = null;
      const currentDate = moment().format("YYYY MMM DD,ddd,hh:mm");
      try {
        const messageObject = {
          username: "yesdoing",
          date: currentDate,
          content: message
        };
        let lastMessage = messages.pop();

        if (
          this.setDateFormat(currentDate) ===
          this.setDateFormat(lastMessage.date)
        ) {
          updateMessages = [...messages, lastMessage, messageObject];
        } else {
          let dateDividerFormat = this.setDateFormat(currentDate);

          updateMessages = [
            ...messages,
            lastMessage,
            dateDividerFormat,
            messageObject
          ];
        }
        richWebApi.talk(messageObject);
      } catch (error) {
        this.setState({
          error: "Sorry, Something unexpected error occurred."
        });
      } finally {
        await this.setState({ messages: updateMessages, message: "" });
        this.scrollToBottom();
      }
    };

    messageDividerOfDate = messages => {
      const modifyMessgae = [...messages];

      let recentDate = this.setDateFormat(modifyMessgae[0].date);
      let updatedMessages = [recentDate];
      for (let message of modifyMessgae) {
        let messageDate = this.setDateFormat(message.date);
        if (recentDate !== messageDate) {
          updatedMessages.push(messageDate);
          recentDate = messageDate;
        }
        updatedMessages.push(message);
      }
      return updatedMessages;
    };

    render() {
      const {
        messages,
        message,
        error,
        loading,
        to_user,
        from_user
      } = this.state;
      const { handleSubmit, handleChangeInput, setMessageContainerRef } = this;

      return (
        <ChatPresenter
          messages={messages}
          message={message}
          error={error}
          loading={loading}
          handleSubmit={handleSubmit}
          handleChangeInput={handleChangeInput}
          toUser={to_user}
          fromUser={from_user}
          loggedInUser={this.props.loggedInUser}
          setMessageContainerRef={setMessageContainerRef}
        />
      );
    }
  }
);
