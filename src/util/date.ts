import * as dayjs from 'dayjs';
import { ErrYezi, ResException } from './error';
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

export const dateRange = (start: any, end: any) => {
  const startIsDate = +isDate(start);
  const endIsDate = +isDate(end);
  if (startIsDate + endIsDate === 1) {
    throw new ResException(ErrYezi.参数类型错误, '时间错误');
  }
  let date: dayjs.Dayjs[] = [];
  if (startIsDate && endIsDate) {
    const $start = dayjs(start);
    const $end = dayjs(end);
    if ($start.isAfter($end)) {
      throw new ResException(ErrYezi.参数类型错误, '时间错误');
    }
    date = [$start, $end];
  }
  return date;
};
