import React from "react";

export interface TextProps {
  children: React.ReactNode;
  color?: "light" | "black" | "gray";
  extraClass?: string;
}
