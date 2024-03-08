export const createParam = (paramObj: any) =>
  Object.keys(paramObj)
    .map((key) => (Array.isArray(paramObj[key]) ? paramObj[key].map((value: any) => `${key}=${encodeURIComponent(value)}`).join('&') : `${key}=${encodeURIComponent(paramObj[key] ?? '')}`))
    .join('&');
