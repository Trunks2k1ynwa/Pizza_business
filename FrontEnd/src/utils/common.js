export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
export const getTokenValue = () => {
  const token = localStorage.getItem('jwt') && null;
  return token;
};
export const getCookieValue = (cookieName) => {
  let name = cookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
};
export const convertDate = (date) => {
  const dateObj = new Date(date);

  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();

  const formattedDate = `${month}-${day}-${year}`;
  return formattedDate;
};
export const compareTime = (date) => {
  const now = new Date();
  const targetTime = new Date(date);
  const diffInMinutes = Math.round((now - targetTime) / 60000);
  return diffInMinutes;
};
export const getLocalValue = (localName) => {
  const localDataJson = localStorage.getItem(localName);
  const localData =
    localDataJson === 'undefined' ? undefined : JSON.parse(localDataJson);
  return localData;
};
