import React from "react";
import Popularpro from "./Popularpro";
import Populargolfplace from "./Populargolfplace";
import styled, { css } from "styled-components";

const Popular = () => {
  return (
    <div>
      <Top5pro>Top 5 Popular Pro</Top5pro>
      <Popularpro />
      <Top5place>Top 5 Popular Place</Top5place>
      <Populargolfplace />
    </div>
  );
};

export default Popular;

const Top5pro = styled.p`
  position: relative;
  margin: 1% 0 2% 0;
  top: 20px;
  left: 80px;
`;

const Top5place = styled.p`
  position: relative;
  margin: 1% 0 2% 0;
  top: 20px;
  left: 80px;
`;
