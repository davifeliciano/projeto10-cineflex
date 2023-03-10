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
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [buyerInfo, setBuyerInfo] = useState(new Map());

  function hasAnyBuyerInfo(seatName) {
    return (
      buyerInfo.get(seatName).name.trim() !== "" ||
      buyerInfo.get(seatName).cpf.trim() !== ""
    );
  }

  function toggleSeatSelection(seatName) {
    if (!session.seats.find((seat) => seat.name === seatName).isAvailable)
      return;

    const selectedSeatsCopy = new Set(selectedSeats);
    const buyerInfoCopy = new Map(buyerInfo);

    if (!selectedSeats.has(seatName)) {
      selectedSeatsCopy.add(seatName);
      setSelectedSeats(selectedSeatsCopy);
      buyerInfoCopy.set(seatName, { name: "", cpf: "" });
      setBuyerInfo(buyerInfoCopy);
      return;
    }

    if (
      !hasAnyBuyerInfo(seatName) ||
      (hasAnyBuyerInfo(seatName) &&
        window.confirm("Deseja realmente remover o assento?"))
    ) {
      selectedSeatsCopy.delete(seatName);
      setSelectedSeats(selectedSeatsCopy);
      buyerInfoCopy.delete(seatName);
      setBuyerInfo(buyerInfoCopy);
    }
  }

  function updateBuyerName(seatName, buyerName) {
    const buyerInfoCopy = new Map(buyerInfo);
    const { cpf } = buyerInfoCopy.get(seatName);
    buyerInfoCopy.set(seatName, { cpf, name: buyerName });
    setBuyerInfo(buyerInfoCopy);
  }

  function updateBuyerCpf(seatName, buyerCpf) {
    const buyerInfoCopy = new Map(buyerInfo);
    const { name } = buyerInfoCopy.get(seatName);
    buyerInfoCopy.set(seatName, { name, cpf: buyerCpf });
    setBuyerInfo(buyerInfoCopy);
  }

  function submitHandler(event) {
    event.preventDefault();

    const ids = Array.from(selectedSeats).map((seatName) => {
      return session.seats.find((seat) => seat.name === seatName).id;
    });

    const compradores = ids.map((id) => {
      const seat = session.seats.find((seat) => seat.id === id);
      return {
        idAssento: id,
        nome: buyerInfo.get(seat.name).name.trim(),
        cpf: buyerInfo.get(seat.name).cpf.trim(),
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
        buyerInfo={buyerInfo}
        updateBuyerName={updateBuyerName}
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
