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
    background-color: #8C8EFB;
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
    z-index: 5;
`;



const ListPresenter = ({ list, error, loading, isToday }) => {
  const chatList = list.map((chat, index) => (
    <ChatItem
      key={index}
      id={index}
      username={chat.username}
      user_profile_image={chat.user_profile_image}
      recent_message={chat.recent_message.content}
      message_time={isToday(chat.recent_message.date)}
    />
  ));

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Button>
        + New message
    </Button>
      {list && list.length > 0 && (
        <ChatList>
          {chatList}
        </ChatList>
      )}
      {error && <Error color="#e74c3c" text={error} />}
      {list && list.length === 0 && (
        <Error color="gray" text="대화방이 없습니다." />
      )}
    </Container>
  );
};

ListPresenter.propTypes = {
  list: PropTypes.array,
  error: PropTypes.string,
  isToday: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ListPresenter;
