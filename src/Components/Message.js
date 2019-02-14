import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 252px;
  background-color: white;
  border-radius: 5px;
  :not(:last-child) {
    margin-bottom: 36px;
  }
  margin-left: ${props => (props.isLogginedUser ? "auto" : "0")};
  margin-right: ${props => (props.isLogginedUser ? "0" : "auto")};
  padding: ${props =>
    props.isLogginedUser ? "20px 30px 20px 16px" : "20px 16px 20px 30px"};
`;

const ImageContainer = styled.div`
  top: -20px;
  left: ${props => (props.isLogginedUser ? "auto" : "-20px")};
  right: ${props => (props.isLogginedUser ? "-20px" : "auto")};
  position: absolute;
`;

const Image = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
`;

const MessageContainer = styled.div``;

const MessageTime = styled.p`
  position: absolute;
  color: #c4c5c5;
  left: ${props => (props.isLogginedUser ? "-37px" : "auto")};
  right: ${props => (props.isLogginedUser ? "auto" : "-37px")};
  font-size: 13px;
`;

const MessageBox = styled.p`
  color: #89898e;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`;

const Message = ({
  id,
  profileImageUrl,
  message,
  isLogginedUser,
  messageTime
}) => (
  <Container isLogginedUser={isLogginedUser}>
    <ImageContainer isLogginedUser={isLogginedUser}>
      <Image bgUrl={profileImageUrl} />
    </ImageContainer>
    <MessageContainer>
      <MessageBox>{message}</MessageBox>
      <MessageTime isLogginedUser={isLogginedUser}>{messageTime}</MessageTime>
    </MessageContainer>
  </Container>
);

Message.propTypes = {
  id: PropTypes.number,
  profileImageUrl: PropTypes.string,
  isLogginedUser: PropTypes.bool,
  messageTime: PropTypes.string,
  message: PropTypes.string.isRequired
};

export default Message;
