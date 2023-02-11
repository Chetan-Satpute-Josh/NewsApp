export const uniqueIDGenerator = () => {
  let id = 1;

  return () => id++;
};
