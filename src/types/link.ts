import React from "react";

export interface LinkProps {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  extraClass?: string;
}
