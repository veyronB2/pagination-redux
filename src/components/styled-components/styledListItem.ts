import styled from "styled-components";
import { theme } from "./theme";

type Props = {
  active: boolean;
};

export const STListItem = styled.li<Props>`
  background-color: ${({ active }) =>
    active ? theme.colors.primaryBlue : theme.colors.white};
  padding: 0.5rem;
  font-size: 1rem;
  color: ${({ active }) =>
    active ? theme.colors.white : theme.colors.primaryBlue};
  :hover {
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    transition: 0.25s;
  }
`;
