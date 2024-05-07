import React, { useState, useEffect } from "react";
import classNames from "classnames";
import OurLink from "components/Link";
import { ITree, TreeItemProps } from "types";
import { axiosInstance } from "utils/api";

const TreeItem: React.FC<TreeItemProps> = ({
  treeId,
  forestId,
  today,
  month,
  year,
  days,
}) => {
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

  // todo: убрать any
  const incrementsDates: any = [];
  let monthIncrements = 0;
  let totalIncrements = 0;

  if (tree?.increments.length) {
    tree.increments.forEach((increment) => {
      const date = increment.date.split("T")[0];

      if (incrementsDates[date]) {
        incrementsDates[date] += increment.value;
      } else {
        incrementsDates[date] = increment.value;
      }

      totalIncrements += increment.value;
    });
  }

  return (
    tree && (
      <tr>
        <td className="text-left align-middle border border-gray py-1 px-3">
          <OurLink
            href={`/forest/${forestId}/tree/${tree.id}`}
            title={tree.description}
          >
            {tree.name}
          </OurLink>
        </td>
        {days.map((day) => {
          const dateString =
            `${year}-` +
            `${month < 10 ? `0${month}` : month}-` +
            `${day < 10 ? `0${day}` : day}`;

          const incrementsCount = incrementsDates[dateString] || 0;
          if (incrementsCount) monthIncrements += incrementsCount;

          const date = new Date(year, month, day);

          const cellClasses = classNames(
            "min-w-9 w-9 min-h-9 h-9 text-center align-middle border border-gray p-1",
            {
              "bg-main text-background font-semibold": incrementsCount > 0,
              "bg-cross bg-no-repeat bg-center opacity-75":
                date < today && !incrementsCount,
            }
          );

          return (
            <td key={day} className={cellClasses}>
              {incrementsCount || ""}
            </td>
          );
        })}
        <td className="text-center align-middle border border-gray p-1">
          {monthIncrements}
        </td>
        <td
          className={classNames(
            "text-center align-middle border border-gray p-1",
            {
              "bg-main text-background font-semibold":
                tree?.limit === totalIncrements,
            }
          )}
        >
          {tree?.limit ? `${totalIncrements} / ${tree.limit}` : totalIncrements}
        </td>
      </tr>
    )
  );
};

export default TreeItem;
