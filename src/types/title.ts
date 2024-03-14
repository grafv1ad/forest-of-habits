import React from "react";

export interface TitleProps {
  level: string;
  children: React.ReactChild | React.ReactNode;
  extraClass?: string;
}
