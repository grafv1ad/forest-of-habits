import React, { useState, useEffect } from "react";
import OurLink from "components/Link";
import { ITree, TreeItemProps } from "types";
import { axiosInstance } from "utils/api";

const TreeItem: React.FC<TreeItemProps> = ({ treeId, forestId }) => {
  const [tree, setTree] = useState<ITree | null>(null);

  useEffect(() => {
    const getTree = async () => {
      try {
        const { data } = await axiosInstance.get(`tree/${treeId}`);
        setTree(data);
      } catch (error: any) {
        setTree(null);
        console.error(error?.response);
      }
    };

    if (!tree) {
      getTree();
    }
  }, []);

  console.debug(tree);

  return (
    tree && (
      <div>
        <OurLink href={`/forest/${forestId}/tree/${tree.id}`}>
          {tree.name}
        </OurLink>
      </div>
    )
  );
};

export default TreeItem;
