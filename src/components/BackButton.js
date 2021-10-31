import React from 'react';
import BackButton from '../images/backButton.png';
import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Img = styled.img`
  height: 4rem;
`;

export default function backButton({ setPage, navigate }) {
  return (
    <Button
      id='backButton'
      onClick={(event) => {
        event.preventDefault();
        window.location = '/';
        navigate();
      }}
    >
      <Img src={BackButton} />
    </Button>
  );
}
