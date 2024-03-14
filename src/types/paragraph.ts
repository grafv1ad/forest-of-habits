import React from "react";

export interface TextProps {
  color: "light" | "dark";
  children: React.ReactNode;
  extraClass?: string;
}
