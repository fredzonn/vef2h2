import React from 'react';

import './Input.scss';

interface IInputProps {
  className?: string;
  name: string;
  value?: string;
  type?: string;
  onChange?: (e: React.FormEvent<HTMLButtonElement>) => void;
  placeHolder?: string;
}

export default function Input(props: IInputProps) {

  return (
    <input></input>
  );
}