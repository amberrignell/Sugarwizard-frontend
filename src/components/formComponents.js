import React from 'react';
import { Input } from '../styledComponents/calculator';

export function InputBox({ label, placeholder, setStateFunction, state, type, initialValue }) {
  const [input, setInput] = React.useState(initialValue);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setStateFunction(event.target.value);
  };

  // React.useEffect(() => {

  // })

  return (
    <div className='input-container'>
      <label htmlFor={label}>{label}</label>
      <Input
        id={label}
        placeholder={placeholder}
        name={label || placeholder}
        type={type || 'text'}
        value={input || initialValue || ''}
        onChange={handleInputChange}
      ></Input>
    </div>
  );
}
