import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";

export default function SuccessPage() {
  const location = useLocation();
  const { session, requestPayload } = location.state;

  return (
    <>
      <Header />
      <PageContainer>
        <h1>
          Pedido feito <br /> com sucesso!
        </h1>

        <TextContainer data-test="movie-info">
          <strong>
            <p>Filme e sessão</p>
          </strong>
          <p>{session.movie.title}</p>
          <p>{`${session.day.date} - ${session.name}`}</p>
        </TextContainer>

        <TextContainer data-test="seats-info">
          <strong>
            <p>Ingressos</p>
          </strong>
          {requestPayload.ids.map((id) => {
            const seatName = session.seats.find((seat) => seat.id === id).name;
            return (
              <p key={id}>{`Assento ${
                (seatName.length === 1 ? "0" : "") + seatName
              }`}</p>
            );
          })}
        </TextContainer>

        <TextContainer data-test="client-info">
          <strong>
            <p>Compradores</p>
          </strong>
          {requestPayload.compradores.map((comprador) => {
            return (
              <React.Fragment key={comprador.idAssento}>
                <p>{`Nome: ${comprador.nome}`}</p>
                <p>{`CPF: ${comprador.cpf}`}</p>
              </React.Fragment>
            );
          })}
        </TextContainer>

        <Link to="/" data-test="go-home-btn">
          <button>Voltar para Home</button>
        </Link>
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
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;

  a {
    text-decoration: none;
  }

  button {
    margin-top: 50px;
  }

  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247a6b;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;

  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
