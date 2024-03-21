import React from "react";

export interface CheckboxProps {
  name: string;
  value?: string;
  checked?: boolean;
  children: React.ReactNode;
  extraClass?: string;
}
