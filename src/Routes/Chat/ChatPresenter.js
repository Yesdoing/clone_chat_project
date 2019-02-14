import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import DateDivider from "Components/DateDivider";
import Error from "Components/Error";

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
  ${props =>
    props.message.length > 0
      ? "background-color: #9087FB; background-image: linear-gradient(to bottom right, #9087FB,  #75A8FB );"
      : "background-color: #d1d1d4;"}
  width: 73px;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.1s ease-in-out;
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
}) => {
  const messageList = messages.map((message, index) => {
    if (typeof message === "string") {
      return <DateDivider date={message} key={index} />;
    } else {
      return (
        <Message
          key={index}
          message={message.content}
          profileImageUrl={
            message.username === loggedInUser
              ? toUser.user_profile_image
              : fromUser.user_profile_image
          }
          isLogginedUser={message.username === loggedInUser}
          messageTime={message.date.split(",")[2].substring(0, 5)}
        />
      );
    }
  });

  return loading ? (
    <Loader />
  ) : (
    <>
      <MessageContainer ref={ref => setMessageContainerRef(ref)}>
        {messageList}
        {error && <Error color="#e74c3c" text={error} />}
      </MessageContainer>
      <Form onSubmit={e => e.preventDefault()}>
        <Input
          placeholder="Type something to send..."
          value={message}
          onChange={handleChangeInput}
        />
        <Submit onClick={handleSubmit} message={message}>
          보내기
        </Submit>
      </Form>
    </>
  );
};

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
