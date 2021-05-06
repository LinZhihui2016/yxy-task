import * as dayjs from 'dayjs';

export const isDate = (date: any) =>
  date !== undefined ? dayjs(date).isValid() : false;
export const initDate = (date: any, init = dayjs()) =>
  isDate(date) ? dayjs(date) : init;

export const dateFormat = (date: dayjs.Dayjs | any) => dayjs(date).toDate();
