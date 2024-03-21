import React from "react";

export interface TextProps {
  children: React.ReactNode;
  color?: "light" | "black" | "gray";
  align?: "start" | "left" | "center" | "right" | "end" | "justify";
  extraClass?: string;
}
