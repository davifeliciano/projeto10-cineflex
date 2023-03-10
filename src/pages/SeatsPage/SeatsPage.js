import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import Seats from "../../components/Seats";
import Form from "../../components/Form";
import SeatsPageFooter from "../../components/SeatsPageFooter";
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
      <Seats
        session={session}
        selectedSeats={selectedSeats}
        toggleSeatSelection={toggleSeatSelection}
      />
      <Form
        selectedSeats={selectedSeats}
        buyersNames={buyersNames}
        updateBuyerName={updateBuyerName}
        buyersCpfs={buyersCpfs}
        updateBuyerCpf={updateBuyerCpf}
        submitHandler={submitHandler}
      />
      <SeatsPageFooter session={session} />
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
