import axios from "axios";
import { UserInterface } from "../types";
import { apiUrl } from "./index.api";

export const login = async (newUser: UserInterface) => {
  const res = await axios.post(`${apiUrl}/authentication/login`, newUser, {
    headers: {
      contentType: "application/json",
    },
  });
  return res;
  //   console.log(newUser);
};
