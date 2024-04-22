export interface WoodsState {
  woods: Wood[];
  isError: boolean;
}

export interface Wood {
  id: number;
  name: string;
  "created-at": string;
}
