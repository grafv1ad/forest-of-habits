import React, { useState, useEffect } from "react";
import classNames from "classnames";
import OurLink from "components/Link";
import {
  ITree,
  TreeItemProps,
  ITreeIncrementsDates,
  ITreeIncrementsState,
} from "types";
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
  const [{ incrementsDates, monthIncrements, totalIncrements }, setIncrements] =
    useState<ITreeIncrementsState>({
      incrementsDates: {},
      monthIncrements: 0,
      totalIncrements: 0,
    });

  const getIncrementsFromTree = (tree: ITree, days: number[]) => {
    const dates: ITreeIncrementsDates = {};
    let total = 0;
    let month = 0;

    if (tree?.increments.length) {
      tree.increments.forEach((increment) => {
        const date = increment.date.split("T")[0];

        if (dates[date]) {
          dates[date] += increment.value;
        } else {
          dates[date] = increment.value;
        }

        total += increment.value;
      });
    }

    days.forEach((day) => {
      const dateString =
        `${year}-` +
        `${month < 10 ? `0${month}` : month}-` +
        `${day < 10 ? `0${day}` : day}`;

      const incrementsCount = dates[dateString] || 0;
      if (incrementsCount) month += incrementsCount;
    });

    return {
      incrementsDates: dates,
      monthIncrements: month,
      totalIncrements: total,
    };
  };

  const getTree = async () => {
    try {
      const { data } = await axiosInstance.get(`tree/${treeId}`);
      setIncrements(getIncrementsFromTree(data, days));
      setTree(data);
    } catch (error: any) {
      setTree(null);
      console.error(error?.response);
    }
  };

  useEffect(() => {
    if (!tree) {
      getTree();
    }
  }, []);

  if (!tree) {
    return "";
  }

  console.debug(tree);

  return (
    <tr>
      <th className="text-left align-middle font-normal border border-gray py-1 px-3">
        <OurLink
          href={`/forest/${forestId}/tree/${tree.id}`}
          title={tree.description}
        >
          {tree.name}
        </OurLink>
      </th>
      {days.map((day) => {
        const date = new Date(year, month, day);
        const dateString =
          `${year}-` +
          `${month < 10 ? `0${month}` : month}-` +
          `${day < 10 ? `0${day}` : day}`;

        const incrementsCount = incrementsDates[dateString] || 0;

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
              tree?.limit && tree?.limit <= totalIncrements,
          }
        )}
      >
        {tree?.limit ? `${totalIncrements} / ${tree.limit}` : totalIncrements}
      </td>
    </tr>
  );
};

export default TreeItem;
