import styled from "styled-components";

export const UserBox = styled.div`
  display: flex;
  border-radius: 2rem;
  background-color: ${props => props.theme.noteMenuBackgroundColor};
  padding: 1rem 2rem;
  margin-top: 1rem;
  box-shadow: 0 .25rem .25rem ${props => props.theme.noteMenuBoxShadowColor};
  justify-self: center;
  align-items: center;
  min-width: 50rem;
  
  > button {
    margin: 1rem;
    height: 2.5rem;
  }
  
  @media (max-width: 800px) {
    min-width: 100%;
  }

  @media (max-width: 630px) {
    flex-direction: column;
  }
`;

export const FlexSpace = styled.div`
  flex-grow: 1;
`;

export const NoteBox = styled.div`
  display: flex;
  border-radius: 3rem;
  background-color: ${props => props.theme.noteBackgroundColor};
  padding: 2rem 2rem;
  margin-top: 1rem;
  box-shadow: 0 .25rem .25rem ${props => props.theme.noteBoxShadowColor};
  justify-self: center;
  align-items: center;
  min-width: 30rem;

  @media (max-width: 800px) {
    min-width: 100%;
  }
`;