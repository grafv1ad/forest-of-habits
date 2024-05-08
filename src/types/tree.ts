export interface ITreeIncrement {
  id: number;
  date: string;
  value: number;
}

export interface ITree {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  counter: number;
  limit: number;
  period: string;
  type: string;
  increments: ITreeIncrement[];
}

export interface ITreeIncrementsDates {
  [key: string]: number;
}

export interface TreeItemProps {
  treeId: number;
  forestId: number;
  today: Date;
  month: number;
  year: number;
  days: number[];
}
