import styled from "styled-components";

export const NavBarBox = styled.div`
  height: var(--navbar-height);
  background-color: grey;
  display: flex;
  align-items: center;
  
`;

export const NavBarName = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0 1rem;
`;

export const NavBarSpace = styled.div`
  flex-grow: 1;
`;