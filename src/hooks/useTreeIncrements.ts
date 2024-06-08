import { useMemo } from "react";
import {
  IHourIncrement,
  ITreeIncrement,
  ITreeIncrementsDates,
  ITreeIncrementsWithValues,
} from "types";
import { getDaysInMonth, getStringDate, getWeekday } from "utils/date";

const calculateIncrements = (increments: ITreeIncrement[], date: Date) => {
  const incrementsList: ITreeIncrementsWithValues = {};
  const incrementsResult: ITreeIncrementsDates = {};

  const realMonth = date.getMonth() + 1;
  const daysCount = getDaysInMonth(date.getMonth(), date.getFullYear());

  let daysWithIncremets = 0;
  let weekdaysIncremets = [0, 0, 0, 0, 0, 0, 0];
  const hoursIncrements: IHourIncrement[] = [];

  if (increments?.length) {
    increments.forEach((increment: ITreeIncrement) => {
      const incrementSplit = increment.date.split("T");
      const date = incrementSplit[0];
      const time = incrementSplit[1];
      const hour = time.split(":")[0];

      if (incrementsList[date]?.value) {
        incrementsList[date].value += increment.value;
        incrementsList[date].hours[+hour] += increment.value;
      } else {
        // eslint-disable-next-line no-restricted-properties
        const hoursArray = Array.from({ length: 24 }, () => 0);
        hoursArray[+hour] = increment.value;

        incrementsList[date] = {
          value: increment.value,
          hours: hoursArray,
        };
      }
    });
  }

  for (let i = 1; i <= daysCount; i++) {
    const dateString = getStringDate(i, realMonth, date.getFullYear());

    if (incrementsList[dateString]?.value) {
      incrementsResult[i] = incrementsList[dateString].value;

      daysWithIncremets += 1;

      weekdaysIncremets[
        getWeekday(i, date.getMonth(), date.getFullYear()).number
      ] += 1;

      incrementsList[dateString].hours.forEach((value, hour) => {
        value *= 5;
        if (value > 25) value = 25;

        hoursIncrements.push({
          x: i,
          y: hour,
          r: value,
        });
      });
    } else {
      incrementsResult[i] = 0;
    }
  }

  // Переносим воскресенье в конец (в js он первый день недели)
  const [firstWeekday, ...restWeekdays] = weekdaysIncremets;
  weekdaysIncremets = [...restWeekdays, firstWeekday];

  return {
    all: incrementsResult,
    weekdays: weekdaysIncremets,
    hours: hoursIncrements,
    daysCount: daysWithIncremets,
  };
};

export const useTreeIncrements = (increments: ITreeIncrement[], date: Date) => {
  return useMemo(
    () => calculateIncrements(increments, date),
    [increments, date]
  );
};
