import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div``;

const MessageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 157px);
  background-color: #ebeef1;
  padding: 40px 46px;
  overflow-y: auto;
`;

const Form = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  padding: 18px 15px;
  border-top: 1px solid #e6e8ee;
  background-color: white;
`;

const Input = styled.input`
  all: unset;
  width: calc(100% - 100px);
  font-size: 18px;
  margin-left: 10px;
  &::placeholder {
    color: #d1d1d4;
  }
`;

const Submit = styled.button`
  all: unset;
  background-color: #7aa0fb;
  width: 73px;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const ChatPresenter = ({
  messages,
  error,
  message,
  loading,
  toUser,
  fromUser,
  handleSubmit,
  handleChangeInput,
  loggedInUser,
  setMessageContainerRef
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <MessageContainer ref={(ref) => setMessageContainerRef(ref) }>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.content}
            profileImageUrl={message.username === loggedInUser ? toUser.user_profile_image : fromUser.user_profile_image}
            isLogginedUser={message.username === loggedInUser}
            messageTime={message.date}
          />))}
      </MessageContainer>
      <Form onSubmit={e => e.preventDefault()}>
        <Input
          placeholder="Type something to send..."
          value={message}
          onChange={handleChangeInput}
        />
        <Submit onClick={handleSubmit}>보내기</Submit>
      </Form>
    </Container>
  );

ChatPresenter.propTypes = {
  messages: PropTypes.array,
  error: PropTypes.string,
  message: PropTypes.string,
  toUser: PropTypes.object,
  fromUser: PropTypes.object,
  loggedInUser: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeInput: PropTypes.func.isRequired
};

export default ChatPresenter;
