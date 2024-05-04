export interface ITree {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  counter: number;
  limit: number;
  period: string;
  type: string;
}

export interface TreeItemProps {
  treeId: number;
  forestId: number;
}
