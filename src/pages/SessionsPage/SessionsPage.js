import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import SessionsPageFooter from "../../components/SessionsPageFooter";
import errorHandler from "../../errorHandler";

export async function loader({ params }) {
  let showTimes;
  await axios
    .get(`movies/${params.idFilme}/showtimes`)
    .then((response) => {
      showTimes = response.data;
    })
    .catch(errorHandler);
  return showTimes;
}

export default function SessionsPage() {
  const showTimes = useLoaderData();

  return (
    <>
      <Header />
      <PageContainer>
        Selecione o horário
        <div>
          {showTimes.days.map((day) => {
            return (
              <SessionContainer key={day.id} data-test="movie-day">
                {`${day.weekday} - ${day.date}`}
                <ButtonsContainer>
                  {day.showtimes.map((showtime) => {
                    return (
                      <Link
                        to={`/assentos/${showtime.id}`}
                        key={showtime.id}
                        data-test="showtime"
                      >
                        <button>{showtime.name}</button>
                      </Link>
                    );
                  })}
                </ButtonsContainer>
              </SessionContainer>
            );
          })}
        </div>
        <SessionsPageFooter showTimes={showTimes} />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;

  div {
    margin-top: 20px;
  }
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;

  button {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
  }
`;
