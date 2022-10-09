const getLanguage = (str) => {
  const regex = /^[\u0400-\u04FF]+$/;
  const lng = regex.test(str) ? 'ru' : 'en';
  return lng;
};

export default getLanguage;
