import { ChangeEvent } from "react";

export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string | number;
  autocomplete?: string;
  extraClass?: string;
  disabled?: boolean;
  touched?: boolean;
  readOnly?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: ChangeEvent) => void;
}
