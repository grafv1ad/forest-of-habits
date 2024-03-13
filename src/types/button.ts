import React from "react";

export interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactChild | React.ReactNode;
  onClick?: () => void;
}
