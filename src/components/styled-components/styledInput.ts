import styled from "styled-components";

export const STInput = styled.input`
  padding: 0.6rem 1rem;
  width: 20rem;
  border: 1px solid ${({ theme }) => theme.colors.bg3};
  border-radius: 5px;
  outline: none;
  margin-top: 4rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.bg3}k;
  }
`;
