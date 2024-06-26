import React from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  style?: "default" | "outline" | "danger" | "success";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  extraClass?: string;
}
