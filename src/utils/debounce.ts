export const debounce = (callback: Function, time: number) => {
  let timeId = null;

  return (event) => {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(callback, time, event);
  };
};
