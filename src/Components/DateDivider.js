import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  line-height: 0.1em;
  margin-bottom: 50px;
`;

const Date = styled.span`
  background: #ebeef1;
  padding: 0 10px;
  color: rgba(0, 0, 0, 0.4);
`;

const DateDivider = ({ date }) => (
  <Container>
    <Date>{date}</Date>
  </Container>
);

DateDivider.propTypes = {
  date: PropTypes.string.isRequired
};

export default DateDivider;
