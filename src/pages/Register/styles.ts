import styled from "styled-components";

export const Background = styled.div`
  display: none;

  @media only screen and (min-width: 1024px) {
    display: block;

    width: 100vw;
    height: 300vh;

    background-color: var(--orange);
    box-shadow: 5px 0px 100px 25px rgba(0, 0, 0, 0.5);

    transform: rotate(-20deg);

    position: absolute;
    top: -100%;
    right: 54%;
    z-index: -1;
  }
`;

export const Header = styled.header`
  position: absolute;
  top: 25px;
  left: 50%;

  z-index: 1;

  transform: translateX(-50%);

  img {
    width: 100px;
  }

  @media only screen and (min-width: 1024px) {
    left: 90%;
    display: flex;
    justify-self: flex-end;
  }

  @media only screen and (min-width: 1440px) {
    max-width: 1280px;
  }
`;

export const Container = styled.main`
  height: 100vh;

  padding: 0 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  overflow: hidden;
`;

export const Content = styled.article`
  max-width: 400px;
  width: 100%;

  text-align: center;

  @media only screen and (min-width: 1024px) {
    max-width: 1280px;

    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const ContainerForm = styled.section`
  form {
    h1 {
      margin-bottom: 20px;

      font-size: 2rem;
    }

    ul {
      li:nth-child(6) {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
          width: 70%;

          margin: 20px 0 5px;
        }
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    width: 35%;
  }
`;

export const ContainerImage = styled.section`
  display: none;

  @media only screen and (min-width: 1024px) {
    display: block;

    width: 35%;
  }
`;