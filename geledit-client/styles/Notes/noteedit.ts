import styled from "styled-components";

export const LastSavedInfo = styled.span`
  font-size: .8rem;
  font-style: italic;
  color: ${props => props.theme.defaultText};
`
export const OptionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 2rem;
  background-color: ${props => props.theme.defaultBackgroundColor};
  box-shadow: 0 .25rem .25rem ${props => props.theme.defaultBoxShadowColor};
  padding: 1rem 2rem;
  margin-top: 1rem;
  justify-self: center;
  align-items: center;
  
  > button {
    margin: 1rem;
    height: 2.5rem;
  }
  
  @media (min-width: 500px) {
    min-width: min(50rem, 90vw);
  }
`;

export const InfoBox = styled.div`
  background-color: ${props => props.theme.defaultBackgroundColor};
  box-shadow: 0 .25rem .25rem ${props => props.theme.defaultBoxShadowColor};
  color: ${props => props.theme.defaultText};
  border-radius: 3rem;
  padding: 2rem 2rem;
  margin-top: 1rem;
  justify-self: center;
  text-decoration: none;

  @media (max-width: 800px) {
    min-width: 100%;
  }
`;

export const NoteBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  justify-self: center;
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${props => props.theme.defaultBackgroundColor};
  box-shadow: 0 .25rem .25rem ${props => props.theme.defaultBoxShadowColor};
  color: ${props => props.theme.defaultText};
  width: 100%;

  textarea {
    overflow: hidden;
    text-decoration: none;
    resize: none;
    border: none;
    outline: none;
    box-shadow: none;
    min-height: 100%;
    line-height:1.4;
    font-size: 1rem;
    height: auto;
    
    color: ${props => props.theme.defaultText};
    background-color: ${props => props.theme.defaultBackgroundColor};
  }
`;

export const EditModeText = styled.span`
  color: ${props => props.theme.defaultText};
`;

export const FileNameText = styled.span`
  color: ${props => props.theme.defaultText};
  font-weight: bold;
  margin-right: 0.25rem;
`;
