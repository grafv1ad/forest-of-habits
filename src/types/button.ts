import React from "react";

export interface ButtonProps {
  type: "button" | "submit" | "reset";
  disabled?: false;
  children: React.ReactNode;
  onClick?: () => void;
  extraClass?: string;
}
