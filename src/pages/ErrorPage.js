import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
      <ErrorContainer>
        <h1>Oops!</h1>
        <p>Parece que algum erro ocorreu...</p>
        <p>
          <span>{error.statusText || error.message}</span>
        </p>
      </ErrorContainer>
    </>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 80%;
  max-width: 30rem;
  margin: 6rem auto;

  & h1 {
    font-size: 2rem;
  }

  & span {
    color: grey;
  }
`;
