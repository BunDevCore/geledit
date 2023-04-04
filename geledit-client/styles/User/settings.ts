import styled from "styled-components";

export const UserSettings = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: left;
  flex-direction: row;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${props => props.theme.defaultBackgroundColor};
  box-shadow: 0 .25rem .25rem ${props => props.theme.defaultBoxShadowColor};
  color: ${props => props.theme.defaultText};

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const BestName = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1.5rem;
  font-weight: bold;
`;