import React from "react";

export interface TitleProps {
  level: "1" | "2" | "3" | "4" | "5" | "6";
  color?: "black" | "light";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  extraClass?: string;
}
