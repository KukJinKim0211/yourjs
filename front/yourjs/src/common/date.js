// Date 객체를 YYYY-MM-DD hh:mm:ss 형식으로 변경
const getFullDateFormat = date => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`} ${
    date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
  }:${date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`}:${
    date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`
  }`;
};

// 입력받은 Date 객체를 YYYY-MM-DD 형식으로 변경
const getYYMMDDFormat = date => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}`;
};

// 입력받은 Date 객체와 날짜 객체를 YYYY-MM-DD 형식으로 변경
const getYYMMFormat = (date, day) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${day >= 10 ? day : `0${day}`}`;
};

export { getFullDateFormat, getYYMMDDFormat, getYYMMFormat };
