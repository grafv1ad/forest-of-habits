export interface WoodsState {
  woods: Wood[];
}

export interface Wood {
  id: number;
  name: string;
  "created-at": string;
}
