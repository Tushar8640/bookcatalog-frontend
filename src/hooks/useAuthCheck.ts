import {useState} from "react";
import {useEffect} from "react";

import { useAppDispatch } from "@/redux/hooks";
import { useAuth } from "./useAuth";
import { logOut, setUser } from "@/redux/features/auth/authSlice";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {

    if (!useAuth) {
      dispatch(logOut());
      localStorage.removeItem("auth");
    } else {
      const auth = JSON.parse(localStorage.getItem("auth")!);
      dispatch(setUser(auth));
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};
