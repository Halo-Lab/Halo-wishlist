export function writeCookie(name: string, val: boolean, expires: number): void {
  const date = new Date();
  date.setDate(date.getDate() + expires);
  document.cookie = name + '=' + val + '; path=/; expires=' + date.toUTCString();
}
