import React from "react";
import styled from "styled-components";

export default function Form({
  selectedSeats,
  buyerInfo,
  updateBuyerName,
  updateBuyerCpf,
  submitHandler,
}) {
  return (
    <>
      <FormContainer onSubmit={submitHandler}>
        {Array.from(selectedSeats).map((seatName) => {
          return (
            <React.Fragment key={seatName}>
              <label
                htmlFor={`nome-${seatName}`}
              >{`Nome do Comprador do Assento ${seatName}`}</label>
              <input
                id={`nome-${seatName}`}
                required
                placeholder="Digite o nome..."
                value={buyerInfo.get(seatName).name}
                onChange={(e) => updateBuyerName(seatName, e.target.value)}
              />
              <label
                htmlFor={`cpf-${seatName}`}
              >{`CPF do Comprador do Assento ${seatName}`}</label>
              <input
                id={`cpf-${seatName}`}
                required
                placeholder="Digite o CPF..."
                value={buyerInfo.get(seatName).cpf}
                onChange={(e) => updateBuyerCpf(seatName, e.target.value)}
              />
            </React.Fragment>
          );
        })}

        <button type="submit">Reservar Assento(s)</button>
      </FormContainer>
    </>
  );
}

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
