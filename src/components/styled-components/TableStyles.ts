import styled from "styled-components";

import { variables } from "./variables";

export const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledH1 = styled.h1`
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

export const TableContainer = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  min-width: 100rem;
  height: 38rem;
  overflow-y: auto;
  margin-bottom: 2rem;
`;

export const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  overflow: hidden;
`;

export const STHead = styled.thead`
  position: sticky;
  z-index: 100;
`;

export const STHeadTR = styled.tr`
  background: ${({ theme }) => theme.colors.primaryBlue};
`;

export const STH = styled.th`
  font-weight: normal;
  padding: ${variables.smSpacing};
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem;
`;

export const STBody = styled.tbody``;

export const STBodyTR = styled.tr`
  background: ${({ theme }) => theme.colors.white};
`;

export const STD = styled.td`
  padding: ${variables.smSpacing};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg3};
  font-size: 1rem;
  width: ${({ width }) => width};
`;

export const STimage = styled.img`
  width: 3rem;
  height: 3rem;
`;
