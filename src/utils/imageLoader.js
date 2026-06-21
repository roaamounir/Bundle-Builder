export const getImage = (imageName) => {
  try {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  } catch {
    console.warn(`Image not found: ${imageName}, using placeholder.`);
    return "/assets/placeholder.png";
  }
};