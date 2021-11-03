import React from 'react';
import styled from 'styled-components';
import Doctor from '../images/doctor.png';
import '../style/Home.css';

const HomeLink = styled.a`
  margin: auto;
  padding: 2rem;
  background-color: hsl(354, 100%, 89%);
  color: #223a70;
  font-family: 'Quicksand', sans-serif;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: 5px 5px 5px #223a70;
`;

const HomeContainer = styled.div`
  padding-top: 7rem;
  display: grid;
  column-gap: 3rem;
  row-gap: 3rem;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    '. myprofile .'
    'resources img calculator'
    'eatin img eatout'
    '. apptutorial .';
`;

function Home({ setPage, navigate }) {
  return (
    <HomeContainer id='home-container'>
      <HomeLink href='/myProfile' id='myprofile' onClick={navigate}>
        My Profile
      </HomeLink>

      <HomeLink href='/resources' id='resources' onClick={navigate}>
        Resources
      </HomeLink>

      <img src={Doctor} id='doctor' alt='doctor doodle' />

      <HomeLink href='/calculator' id='calculator' onClick={navigate}>
        Calculator
      </HomeLink>

      <HomeLink href='/eatIn' id='eatin' onClick={navigate}>
        Eat In
      </HomeLink>
      <HomeLink href='/eatOut' id='eatout' onClick={navigate}>
        Eat Out
      </HomeLink>

      <HomeLink href='/appTutorial' id='apptutorial' onClick={navigate}>
        App Tutorial
      </HomeLink>
    </HomeContainer>
  );
}

export default Home;
