import { useAtom } from "jotai";
import * as React from "react";

import { isLoggedInAtom } from "../../App";
import { Auth } from "./auth";
import { Guest } from "./guest";

export const RootNavigation = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  console.log("IsLoading:", isLoggedIn);

  return isLoggedIn ? <Auth /> : <Guest />;
};
