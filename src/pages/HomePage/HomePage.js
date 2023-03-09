import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

export async function loader() {
  let movies;
  await axios
    .get("movies")
    .then((response) => {
      movies = response.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
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
