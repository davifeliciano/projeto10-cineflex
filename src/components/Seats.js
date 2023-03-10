import styled from "styled-components";

export default function Seats({ session, selectedSeats, toggleSeatSelection }) {
  return (
    <>
      <SeatsContainer>
        {session.seats.map((seat) => (
          <SeatItem
            key={seat.id}
            isAvailable={seat.isAvailable}
            isSelected={selectedSeats.has(seat.name)}
            onClick={() => toggleSeatSelection(seat.name, seat.isAvailable)}
            data-test="seat"
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
    </>
  );
}

const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
