import { useAtom } from "jotai";
import * as React from "react";

import { isLoggedInAtom } from "../../App";
import { AuthNavigation } from "./auth";
import { GuestNavigation } from "./guest";

export const RootNavigation = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  console.log("IsLoading:", isLoggedIn);

  return isLoggedIn ? <AuthNavigation /> : <GuestNavigation />;
};
