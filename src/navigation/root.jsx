import { useAtomValue } from "jotai";
import * as React from "react";

import { isLoggedInAtom } from "../../App";
import { AuthNavigation } from "./auth";
import { GuestNavigation } from "./guest";

export const RootNavigation = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return isLoggedIn ? <AuthNavigation /> : <GuestNavigation />;
};
