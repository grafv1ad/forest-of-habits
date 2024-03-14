import React from "react";

export interface LinkProps {
  children: React.ReactChild | React.ReactNode;
  url: string;
  extraClass?: string;
}
