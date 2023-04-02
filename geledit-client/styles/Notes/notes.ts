import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

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

export const NoteLink = styled.div`
  display: flex;
  border-radius: 3rem;
  background-color: ${props => props.theme.noteBackgroundColor};
  padding: 2rem 2rem;
  margin-top: 1rem;
  box-shadow: 0 .25rem .25rem ${props => props.theme.noteBoxShadowColor};
  justify-self: center;
  min-width: 30rem;
  color: ${props => props.theme.navbarText};
  flex-direction: row;
  text-decoration: none;
  
  a:first-child {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    align-items: flex-start;
    width: 100%;
    color: ${props => props.theme.navbarText};
  }

  @media (max-width: 800px) {
    min-width: 100%;
  }
`;

export const FlexSpace = styled.div`
  flex-grow: 1;
`;

export const NoteName = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;

export const NoteOwner = styled.p``;

export const NoteInfo = styled.div`
  background-color: ${props => props.theme.noteBackgroundColor};
  box-shadow: 0 .25rem .25rem ${props => props.theme.noteBoxShadowColor};
  color: ${props => props.theme.navbarText};
  border-radius: 3rem;
  padding: 2rem 2rem;
  margin-top: 1rem;
  justify-self: center;
  text-decoration: none;

  @media (max-width: 800px) {
    min-width: 100%;
  }
`;

export const DelButtonIcon = styled(IconButton)`
  margin-left: 1rem;
`;