export interface WoodsState {
  isLoaded: boolean;
  woods: Wood[];
}
export interface Tree {
  id: number;
  name: string;
  description: string;
  type: string;
  period: string;
  createdAt: string;
  limit: number;
  forestId: number;
  counter: number;
}

export interface Wood {
  id: number;
  name: string;
  "created-at": string;
  trees: Tree[];
}
