import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useUI } from "../Context/UI";

const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 85px;
  z-index: 5;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3e3f4d;
`;

const Button = styled.button`
  all: unset;
  position: absolute;
  left: 25px;
  color: #9e9fa6;
  font-size: 20px;
  cursor: pointer;
`;

const Title = styled.h3`
  color: #cdcdd2;
  font-size: 21px;
  font-weight: 600;
`;

export default withRouter(
  useUI(({ location: { pathname }, history: { push }, chatHeaderUsername }) => (
    <Header>
      <Inner>
        {pathname.includes("/chat") && (
          <Button onClick={() => push("/")}>뒤로</Button>
        )}
        <Title>
          {pathname.includes("/chat") && chatHeaderUsername}
          {pathname === "/" && "C H A T"}
        </Title>
      </Inner>
    </Header>
  ))
);
