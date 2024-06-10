export const getCopiedDate = (date: Date) => new Date(date.getTime());

export const getMonthName = (month: number) => {
  return [
    ["Январь", "Январе", "Января"],
    ["Февраль", "Феврале", "Февраля"],
    ["Март", "Марте", "Марта"],
    ["Апрель", "Апреле", "Апреля"],
    ["Май", "Мае", "Мая"],
    ["Июнь", "Июне", "Июня"],
    ["Июль", "Июле", "Июля"],
    ["Август", "Авгусе", "Августа"],
    ["Сентябрь", "Сентябре", "Сентября"],
    ["Октябрь", "Октябре", "Октября"],
    ["Ноябрь", "Ноябре", "Ноября"],
    ["Декабрь", "Декабре", "Декабря"],
  ][month];
};

export const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

export const getWeekdayName = (number: number, shift = false) => {
  if (shift) {
    number += 1;
    if (number > 6) number = 0;
  }
  return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][number];
};

export const getWeekday = (day: number, month: number, year: number) => {
  const dayNumber = new Date(year, month, day).getDay();
  const dayName = getWeekdayName(dayNumber);

  return {
    number: dayNumber,
    name: dayName,
  };
};

export const getStringDate = (
  day: number,
  month: number,
  year: number,
  hours?: number,
  minutes?: number
) => {
  return `${
    `${year}-` +
    `${month < 10 ? `0${month}` : month}-` +
    `${day < 10 ? `0${day}` : day}`
  }${
    hours && minutes
      ? `T${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:00`
      : ""
  }`;
};
