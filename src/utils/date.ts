export const getCopiedDate = (date: Date) => new Date(date.getTime());

export const getMonthName = (month: number) => {
  return [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ][month];
};

export const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

export const getWeekday = (day: number, month: number, year: number) => {
  const dayNumber = new Date(year, month, day).getDay();
  const dayName = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][dayNumber];

  return {
    number: dayNumber,
    name: dayName,
  };
};
