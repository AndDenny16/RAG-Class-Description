import { useState } from 'react';

export function useFormInput(initialValue) {
  //State for Updating UI
  const [value, setValue] = useState(initialValue);

  //Handle change
  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}