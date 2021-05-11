import * as dayjs from 'dayjs';
export const isDateString = (date: string) =>
  date !== undefined ? dayjs(date).isValid() : false;

export const isDateNumber = (date: number) =>
  date !== undefined ? dayjs(date).isValid() : false;

export const isDate = (date: any) => isDateNumber(+date) || isDateString(date);

export const initDate = (date: any, init = dayjs()) => {
  if (isDateNumber(+date)) {
    return dayjs(+date);
  }
  if (isDateString(date)) {
    return dayjs(date);
  }
  return init;
};

export const dateFormat = (date: dayjs.Dayjs | any) => dayjs(date).toDate();
