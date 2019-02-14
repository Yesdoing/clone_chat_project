import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChatList from "Components/ChatList";
import Loader from "Components/Loader";
import Error from "../../Components/Error";
import ChatItem from "Components/ChatItem";

const Container = styled.div`
  min-width: 414px;
  top: 170px;
`;

const Button = styled.div`
    position: fixed;
    top: 85px;
    width: 100%;
    height: 85px;
    background-color: #9087FB;
    background-image: linear-gradient(to right, #9087FB, #75A8FB);
    
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
    z-index: 5;
`;



const ListPresenter = ({ chatList, error, loading, isToday, readMessage}) => {
  const chatItems = chatList.map((chat, index) => (
    <ChatItem
      key={index}
      id={chat.id}
      username={chat.username}
      userProfileImage={chat.user_profile_image}
      recentMessage={chat.recent_message.content}
      messageTime={isToday(chat.recent_message.date)}
      unReadNumber={chat.unread_number}
      readMessage={readMessage}
    />
  ));

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Button>+ New message</Button>
      {chatList && chatList.length > 0 && (
        <ChatList>
          {chatItems}
        </ChatList>
      )}
      {error && <Error color="#e74c3c" text={error} />}
      {chatList && chatList.length === 0 && (
        <Error color="gray" text="대화방이 없습니다." />
      )}
    </Container>
  );
};

ListPresenter.propTypes = {
  chatList: PropTypes.array,
  error: PropTypes.string,
  isToday: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  readMessage: PropTypes.func.isRequired
};

export default ListPresenter;
