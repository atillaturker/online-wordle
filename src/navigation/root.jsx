import { useAtomValue } from "jotai";
import * as React from "react";

import { GlobalState } from "../../App";
import { AuthNavigation } from "./auth";
import { GuestNavigation } from "./guest";

export const RootNavigation = () => {
  const isLoggedIn = useAtomValue(GlobalState.isLoaggedIn);

  return isLoggedIn ? <AuthNavigation /> : <GuestNavigation />;
};
