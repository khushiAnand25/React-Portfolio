// utils.js
export const getImageUrl = (path) => {
  // This works with images inside src/assets/
  return new URL(`../assets/${path}`, import.meta.url).href;
};
