import { createContext, useContext } from "react";

export const SideNavContext = createContext();

export function useSideNav() {
  return useContext(SideNavContext);
}
