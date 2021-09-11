import styled from "styled-components";

export const Conteiner = styled.div`
  width: 70%;
  max-width: 1280px;
  margin: 0 auto;
  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
  }
`;

export const ItemsConteiner = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  // a classe item deve estar dentro da div que será passada como children.
  .item {
    flex: none;
    width: 34%;
    height: 100px;
    scroll-snap-align: start;
    pointer-events: none;
    text-align: center;
    cursor: pointer;

    @media (min-width: 1024px) {
      width: 25%;
      height: 13vh;
    }

    @media (min-width: 1440px) {
      width: 13%;
      height: 10vh;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      pointer-events: fill;

      @media (min-width: 1024px) {
        width: 70px;
        height: 70px;
      }
    }
    p {
      pointer-events: fill;
    }
  }
`;
