import React from "react";

export interface TitleProps {
  level: number;
  color: string;
  children: React.ReactNode;
  extraClass?: string;
}
