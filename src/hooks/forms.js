import { useState } from 'react';

export const useFormInput = () => {
  const [value, setValue] = useState('');
  const [validity, setValidity] = useState(false);

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
    setValidity(event.target.value.trim() !== '');
  };

  return { value, onChange:  inputChangeHandler, validity };
};