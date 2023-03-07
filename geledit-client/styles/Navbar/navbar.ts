import styled from "styled-components";
import Link from "next/link";

export const NavBarBox = styled.div`
  height: var(--navbar-height);
  background-color: ${props => props.theme.navbarBackgroundColor};
  display: flex;
  align-items: center;
`;

export const NavBarNameLink = styled(Link)`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0 1rem;
  height: var(--navbar-height);
  color: ${props => props.theme.navbarText};
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const NavBarSpace = styled.div`
  flex-grow: 1;
`;

export const NavBarLoginBox = styled.div`
  margin: auto 1rem;
`;