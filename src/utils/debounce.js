export const debounce = (callback, time) => {
  let timeId = null;

  return (event) => {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(callback, time, event);
  };
};
