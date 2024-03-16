import React from "react";

export interface TextProps {
  color: "light" | "dark" | "gray";
  children: React.ReactNode;
  extraClass?: string;
}
