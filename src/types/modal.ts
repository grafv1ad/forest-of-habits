import React from "react";

export interface Modalrops {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  onHangleModal: () => void;
}
