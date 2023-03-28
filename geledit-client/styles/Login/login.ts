import styled from "styled-components";
import Box from '@mui/material/Box';

export const LoginBox = styled(Box)`
  border-radius: 1rem;
  background-color: ${props => props.theme.loginBackgroundColor};
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 .25rem .25rem ${props => props.theme.loginBoxShadowColor};
  justify-self: center;
`;

export const LoginDataBox = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  & input {
    background-color: white;
    border-radius: 4px 4px 0 0;
    color: black;
  }
`;