import styled from "styled-components";

export const E404Box = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  justify-self: center;
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 2rem;
  background-color: ${props => props.theme.defaultBackgroundColor};
  box-shadow: 0 .25rem .25rem ${props => props.theme.defaultBoxShadowColor};
  color: ${props => props.theme.defaultText};
`;

export const E404StatusCode = styled.div`
  align-self: center;
  font-size: 4rem;
  font-weight: bold;
`;

export const E404Status = styled.div`
  font-size: 4rem;
`;