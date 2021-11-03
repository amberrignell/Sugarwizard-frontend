import React from 'react';
import styled from 'styled-components';

const LandingLink = styled.a`
  padding: 2rem;
  margin: 2vh;
  width: 40%;
  background-color: hsl(354, 100%, 89%);
  color: #223a70;
  font-family: 'Quicksand', sans-serif;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: 5px 5px 5px #223a70;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 8vh;
  @media (max-width: 420px) {
    padding-top: 1vh;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #223a70;
  font-family: 'Press Start 2P', cursive;
  width: 50%;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #223a70;
  font-family: 'Press Start 2P', cursive;
  width: 50%;
`;

function Landing({ setPage, navigate }) {
  return (
    <>
      <Nav>
        <Title>Welcome to Sugar Wizard!</Title>
        <Subtitle>Crunch numbers not sugar!</Subtitle>
        <LandingLink href='/signup' onClick={navigate}>
          Sign up
        </LandingLink>
        <LandingLink href='/login' onClick={navigate}>
          Log in
        </LandingLink>
        <LandingLink href='/calculator' onClick={navigate}>
          Calculate
        </LandingLink>
      </Nav>
    </>
  );
}

export default Landing;
