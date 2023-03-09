import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
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
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {movies.map((movie) => {
          return (
            <MovieContainer key={movie.id}>
              <Link to={`/sessoes/${movie.id}`}>
                <img src={movie.posterURL} alt={`${movie.title} Poster`} />
              </Link>
            </MovieContainer>
          );
        })}
      </ListContainer>
    </PageContainer>
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

const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;

const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
