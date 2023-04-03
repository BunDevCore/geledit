import styled from "styled-components";

export const SettingsBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${props => props.theme.defaultBackgroundColor};
  box-shadow: 0 .25rem .25rem ${props => props.theme.defaultBoxShadowColor};
  color: ${props => props.theme.defaultText};
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const GuestName = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;