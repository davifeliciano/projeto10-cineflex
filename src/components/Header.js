import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <NavContainer>
      <BackButton to={-1} path={pathname} data-test="go-home-header-btn">
        <BiArrowBack />
      </BackButton>
      <Link to="/">CINEFLEX</Link>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;

  & a {
    text-decoration: none;
    color: inherit;
  }
`;

const BackButton = styled(Link)`
  display: ${(props) => (props.path === "/" ? "none" : "")};
  width: 1rem;
  height: 2rem;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  user-select: none;
  -webkit-user-drag: none;
`;
