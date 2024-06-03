import React from "react";

import { IBreadcrumbsItem } from "./breadcrumbs";

export interface PageLayoutProps {
  verticalCentered?: boolean;
  breadcrumbs?: IBreadcrumbsItem[];
  children: React.ReactNode;
}
