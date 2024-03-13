export const useHost = () => {
  const { host } = process.server ? useRequestHeaders() : window.location;

  return host;
};
