import { useEffect, useId, useState } from 'react';

interface InputProps {
  name: string;
  placeholder: string;
  defaultValue?: string;
  [prop: string]: unknown;
}

function Input({ name, placeholder, defaultValue, ...props }: InputProps) {
  // https://react.dev/reference/react/useId
  const inputId = useId();

  const [value, setValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  return (
    <input
      // React - state
      value={value}
      onChange={handleChange}
      // infos de base
      id={inputId}
      className="rounded-full  max-w-[500px] w-full py-2 pl-2 mt-2 shadow-xl"
      // infos obligatoires
      name={name}
      placeholder={placeholder}
      // autres infos
      {...props}
    />
  );
}

export default Input;
