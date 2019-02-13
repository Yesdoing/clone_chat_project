import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link as ATag } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 114px;
  display: flex;
  align-items: center;
  transition: .1s background-color;
  &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const Image = styled.div`
  width: 114px;
  height: 114px;
  background-image: url(${props => props.bgImg});
  background-size: cover;
  background-position: center center;
`;

const ImageContainer = styled.div`
  width: 114px;
  height: 100%;
`;

const MessageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f0f0f0;
`;

const MessageTime = styled.span`
  position: absolute;
  right: 20px;
  top: 17px;
  font-weight: 400;
  color: #c1c1c1;
`;
const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 26px;
`;
const Username = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #424562;
  margin-bottom: 10px;
`;

const RecentMessage = styled.span`
  color: #96959a;
`;

const Link = styled(ATag)`
`;

const ChatItem = ({
  id,
  user_profile_image,
  username,
  recent_message,
  message_time
}) => (
  <Link to={`/chat/${id}`}>
    <Container>
      <ImageContainer>
        <Image bgImg={user_profile_image} />
      </ImageContainer>
      <MessageContainer>
        <MessageBox>
          <Username>{username}</Username>
          <RecentMessage>
            {recent_message.length > 36
              ? `${recent_message.substring(0, 36)}..`
              : recent_message}
          </RecentMessage>
        </MessageBox>
        <MessageTime>{message_time}</MessageTime>
      </MessageContainer>
    </Container>
  </Link>
);

ChatItem.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  user_profile_image: PropTypes.string,
  recent_message: PropTypes.string,
  message_time: PropTypes.string
};

export default ChatItem;
