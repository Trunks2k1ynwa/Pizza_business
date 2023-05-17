export const theme = {
  primary: '#15463D',
  secondary: '#97BC62',
  info: '#1c92d4',
  success: '#1ac44a',
  warning: '#eaa912',
  danger: '#c91b1b',
  white: '#ffffff',
  dark: '#000000',
  semi: '#EFF2FE',
  meta: '#def4fc',
  alice: '#171725',
};
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const imgbbAPI = `https://api.imgbb.com/1/upload?key=d7da753c0765f00dc045ddeb36929aa5`;

export const getCookieValue = (name) => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
};

export const paymentStatus = {
  ONLINE: 1,
  SHIPPING: 2,
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
