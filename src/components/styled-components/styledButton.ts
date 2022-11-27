import styled from "styled-components";
import { theme } from "../styled-components/theme";

export const STButton = styled.button`
  width: 7rem;
  margin-left: 1rem;
  margin-right: 1rem;
  text-transform: capitalize;
  padding: 0.3rem 2rem;
  border-radius: 5px;
  border: 1px solid
    ${({ disabled }) =>
      disabled ? theme.colors.bg3 : theme.colors.primaryBlue};
  background-color: transparent;
  color: ${({ disabled }) =>
    disabled ? theme.colors.bg3 : theme.colors.primaryBlue};
  pointer-events: ${(props) => (props.disabled ? "none" : null)};
  :hover {
    background-color: ${theme.colors.primaryBlue};
    color: ${theme.colors.white};
    transition: 0.25s;
    cursor: pointer;
  }
`;
