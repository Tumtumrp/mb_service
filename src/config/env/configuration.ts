export const configuration = (): object => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
  };
};
