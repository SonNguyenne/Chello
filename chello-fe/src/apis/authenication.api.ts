import axios from "axios";
import { UserInterface } from "../types";
import { apiUrl } from "./index.api";

export const login = async (newUser: UserInterface) => {
  const res = await axios.post(`${apiUrl}/authentication/login`, newUser, {
    headers: {
      contentType: "application/json",
    },
  });
  console.log(res.status);
  if (res.data.auth === undefined) {
    alert(res.data.message);
  } else {
    window.localStorage.setItem("user", JSON.stringify(res.data.auth));
    window.location.href = "/";
  }
  return res;
  //   console.log(newUser);
};

export const logout = async () => {
  await window.localStorage.removeItem("user");
  window.location.href = "/login";
};
