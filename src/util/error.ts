import { isArr } from './arr';

export enum ErrYezi {
  未找到 = 1001,
  已存在,
  参数类型错误,
}

export type Err = ErrYezi;

export class ResException extends Error {
  constructor(public code: Err, public msg: string | string[] = '') {
    super(isArr(msg).join(' | '));
  }
}
