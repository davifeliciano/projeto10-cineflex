import axios from "axios";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import MovieList from "../../components/MovieList";
import errorHandler from "../../errorHandler";

export async function loader() {
  let movies;
  await axios
    .get("movies")
    .then((response) => {
      movies = response.data;
    })
    .catch(errorHandler);
  return movies;
}

export default function HomePage() {
  const movies = useLoaderData();

  return (
    <>
      <Header />
      <PageContainer>
        Selecione o filme
        <MovieList movies={movies} />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
