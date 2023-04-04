import styled from "styled-components";
import Link from "next/link";
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";

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

export const LoginButton = styled(Button)`
  border-radius: 100rem;
  text-decoration: none !important;
  @media (max-width: 499px) {
    display: none;
  }
`;

export const LoginButtonIcon = styled(IconButton)`
  border-radius: 100%;
  border: #2196f3a0 solid 1px;
  @media (min-width: 500px) {
    display: none;
  }
`;

export const LinkLogin = styled(Link)`
  display: ${props => props.$isLoggedIn ? "none" : ""};
`;

export const LinkUser = styled.div`
  display: ${props => // @ts-ignore it is resolved 😢
          props.$isLoggedIn ? "flex" : "none"};
  align-items: center;
  justify-items: center;
`;

export const UserButtonIcon = styled(IconButton)`
  margin-left: 0.25rem;
  border: #2196f3a0 solid 1px;
  border-radius: 100rem;
  padding: 0.5rem 1rem;
`;

export const UserNameDisplay = styled.p`
  border: #2196f3a0 solid 1px;
  border-radius: 100rem;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.navbarText}
`;