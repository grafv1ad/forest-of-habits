export interface IBreadcrumbsItem {
  name: string;
  link?: string;
}

export interface BreadcrumbsProps {
  items?: IBreadcrumbsItem[] | null;
}
