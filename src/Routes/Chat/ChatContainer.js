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
      }

      this.scrollToBottom = () => {
        if(this.messageContainer) {
          const { scrollHeight } = this.messageContainer;
          this.messageContainer.scrollTop = scrollHeight;  
        }
      }
  

    }

    componentDidMount() {
      const {
        match: {
          params: { id }
        },
        history: { push }
      } = this.props;

      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        return push("/");
      }

      try {
        const data = richWebApi.chat(parsedId);
        this.setState({
          messages: data.messages,
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
      try {
        const messageObject = {
          username: "yesdoing",
          date: moment().format("YYYY MMM DD,ddd,hh:mm"),
          content: message
        };
        updateMessages = [...messages, messageObject];
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
