export function setCookie(name: string, value: any, expiredays: any) {
  const today = new Date();
  today.setDate(today.getDate() + expiredays);
  document.cookie = `${name}=${escape(
    value
  )}; path=/; expires=${today.toUTCString()};`;
}

export function setCookieWithDate(name: string, value: any, expireDate: any) {
  const date = new Date(expireDate);
  document.cookie = `${name}=${escape(
    value
  )}; path=/; expires=${date.toUTCString()};`;
}

export function getCookie(name: string) {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? unescape(value[2]) : null;
}

export function removeCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
