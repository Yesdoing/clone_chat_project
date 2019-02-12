import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 170px);
  top: 170px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const ChatList = ({ children }) => (
  <Container>
    <Grid>{children}</Grid>
  </Container>
);

ChatList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ChatList;
