import styled from "styled-components";

export const SettingsBox = styled.div`
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