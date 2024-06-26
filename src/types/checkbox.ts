import React, { ChangeEvent } from "react";

export interface CheckboxProps {
  name: string;
  value?: string;
  disabled?: boolean;
  children: React.ReactNode;
  extraClass?: string;
  touched?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: ChangeEvent) => void;
}
