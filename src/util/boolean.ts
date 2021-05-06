export const toNum = (t: any) => {
  return !(t === '0' || t === 'false') && +!!t;
};
