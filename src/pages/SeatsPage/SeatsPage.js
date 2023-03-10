import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import errorHandler from "../../errorHandler";

export async function loader({ params }) {
  let session;
  await axios
    .get(`showtimes/${params.idSessao}/seats`)
    .then((response) => {
      session = response.data;
    })
    .catch(errorHandler);
  return session;
}

export default function SeatsPage() {
  const session = useLoaderData();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [buyersNames, setBuyersNames] = useState(new Map());
  const [buyersCpfs, setBuyersCpfs] = useState(new Map());

  function hasAnyBuyerInfo(seatName) {
    return (
      (buyersNames.get(seatName) ?? "") !== "" ||
      (buyersCpfs.get(seatName) ?? "") !== ""
    );
  }

  function toggleSeatSelection(seatName) {
    if (!session.seats.find((seat) => seat.name === seatName).isAvailable)
      return;

    if (!selectedSeats.includes(seatName)) {
      setSelectedSeats([...selectedSeats, seatName]);
      return;
    }

    if (
      !hasAnyBuyerInfo(seatName) ||
      (hasAnyBuyerInfo(seatName) &&
        window.confirm("Deseja realmente remover o assento?"))
    ) {
      setSelectedSeats(
        selectedSeats.filter(
          (selectedSeatName) => selectedSeatName !== seatName
        )
      );
    }
  }

  function updateBuyerName(seatName, buyerName) {
    const currentBuyersNames = new Map(buyersNames);
    currentBuyersNames.set(seatName, buyerName);
    setBuyersNames(currentBuyersNames);
  }

  function updateBuyerCpf(seatName, buyerCpf) {
    const currentBuyersCpfs = new Map(buyersCpfs);
    currentBuyersCpfs.set(seatName, buyerCpf);
    setBuyersCpfs(currentBuyersCpfs);
  }

  function submitHandler(event) {
    event.preventDefault();

    const ids = selectedSeats.map(
      (seatName) => session.seats.find((seat) => seat.name === seatName).id
    );

    const compradores = ids.map((id) => {
      const seat = session.seats.find((seat) => seat.id === id);
      return {
        idAssento: id,
        nome: buyersNames.get(seat.name).trim(),
        cpf: buyersCpfs.get(seat.name).trim(),
      };
    });

    if (compradores.some((buyer) => buyer.nome === "" || buyer.cpf === ""))
      return;

    const requestPayload = { ids, compradores };
    console.log(requestPayload);
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {session.seats.map((seat) => (
          <SeatItem
            key={seat.id}
            isAvailable={seat.isAvailable}
            isSelected={selectedSeats.includes(seat.name)}
            onClick={() => toggleSeatSelection(seat.name)}
          >
            {(seat.name.length === 1 ? "0" : "") + seat.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle isSelected={true} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable={true} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable={false} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={submitHandler}>
        {selectedSeats.map((seatName) => {
          return (
            <React.Fragment key={seatName}>
              <label
                htmlFor={`nome-${seatName}`}
              >{`Nome do Comprador do Assento ${seatName}`}</label>
              <input
                id={`nome-${seatName}`}
                required
                placeholder="Digite o nome..."
                value={buyersNames.get(seatName) ?? ""}
                onChange={(e) => updateBuyerName(seatName, e.target.value)}
              />
              <label
                htmlFor={`cpf-${seatName}`}
              >{`CPF do Comprador do Assento ${seatName}`}</label>
              <input
                id={`cpf-${seatName}`}
                required
                placeholder="Digite o CPF..."
                value={buyersCpfs.get(seatName) ?? ""}
                onChange={(e) => updateBuyerCpf(seatName, e.target.value)}
              />
            </React.Fragment>
          );
        })}

        <button type="submit">Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer>
        <div>
          <img
            src={session.movie.posterURL}
            alt={`${session.movie.title} Poster`}
          />
        </div>
        <div>
          <p>{session.movie.title}</p>
          <p>{`${session.day.weekday} - ${session.name}`}</p>
        </div>
      </FooterContainer>
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
  padding-bottom: 120px;
  padding-top: 70px;
`;

const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;

  label {
    font-size: 1rem;
  }

  button {
    align-self: center;
  }

  input {
    width: calc(100vw - 60px);
  }
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;

const CaptionCircle = styled.div`
  border: 1px solid
    ${(props) => {
      return props.isSelected
        ? "#0e7d71"
        : props.isAvailable
        ? "#808f9d"
        : "#f7c52b";
    }};
  background-color: ${(props) => {
    return props.isSelected
      ? "#1aae9e"
      : props.isAvailable
      ? "#c3cfd9"
      : "#fbe192";
  }};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;

const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

const SeatItem = styled(CaptionCircle)`
  font-family: "Roboto";
  font-size: 11px;
  user-select: none;

  &:hover {
    cursor: ${(props) => (props.isAvailable ? "pointer" : "not-allowed")};
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;

    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      text-align: left;

      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
