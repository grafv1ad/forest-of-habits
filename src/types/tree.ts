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
  totalNumberTrees?: number;
}

export interface ITreePeriods {
  [key: string]: string;
}

export interface ITreeTypes {
  [key: string]: string;
}

export interface ITreeIncrementsDates {
  [key: string]: number;
}

export interface ITreeIncrementValues {
  value: number;
  hours: number[];
}

export interface ITreeIncrementsWithValues {
  [key: string]: ITreeIncrementValues;
}

export interface ITreeIncrementsState {
  incrementsDates: ITreeIncrementsDates;
  monthIncrements: number;
  totalIncrements: number;
}

export interface TreeItemProps {
  treeId: number;
  forestId: number;
  today: Date;
  month: number;
  year: number;
  days: number[];
  isShared: boolean;
}

export interface IHourIncrement {
  y: number;
  r: number;
  x: number;
}

export interface ITreeCreateRequest {
  name: string;
  description?: string;
  type: string;
  period?: string;
  limit?: number;
  // eslint-disable-next-line camelcase
  forest_id: number;
  // eslint-disable-next-line camelcase
  created_at?: string;
}

export interface ITreeEditRequest {
  name: string;
  description?: string;
  limit?: number;
  type: string;
  // eslint-disable-next-line camelcase
  forest_id: number;
  // eslint-disable-next-line camelcase
  created_at?: string;
}
