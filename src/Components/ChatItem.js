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

const UnreadNumber = styled.div`
    position: absolute;
    right: 20px;
    top: 45px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    font-size: 12px;
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RecentMessage = styled.span`
  color: #96959a;
`;

const Link = styled(ATag)`
`;

const ChatItem = ({
  id,
  userProfileImage,
  username,
  recentMessage,
  messageTime,
  unReadNumber,
  readMessage
}) => (
  <Link to={`/chat/${id}`} onClick={()=>{readMessage(id)}}>
    <Container>
      <ImageContainer>
        <Image bgImg={userProfileImage} />
      </ImageContainer>
      <MessageContainer>
        <MessageBox>
          <Username>{username}</Username>
          <RecentMessage>
            {recentMessage.length > 36
              ? `${recentMessage.substring(0, 36)}..`
              : recentMessage}
          </RecentMessage>
        </MessageBox>
          { unReadNumber === 0 ? null : <UnreadNumber>{unReadNumber}</UnreadNumber>}
        <MessageTime>{messageTime}</MessageTime>
      </MessageContainer>
    </Container>
  </Link>
);

ChatItem.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  userProfileImage: PropTypes.string,
  recentMessage: PropTypes.string,
  messageTime: PropTypes.string,
  unReadNumber: PropTypes.number,
  readMessage: PropTypes.func.isRequired
};

export default ChatItem;
