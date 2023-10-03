import MATContract from "./contract";

export const createContext = () => {
  const mat = new MATContract();

  return {
    mat,
  };
};
