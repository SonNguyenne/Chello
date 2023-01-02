import axios from "axios";
import { WorkspaceInterface } from "../types";

export const fetchWorkspace = async () => {
  const res = await axios.get(
    "https://chello-be-a5ll.onrender.com/workspace/getWorkspace",
    {
      headers: {
        contentType: "application/json",
      },
      // Data
    }
  );
  return res;
};

export const createWorkspace = async (data: WorkspaceInterface) => {
  const res = await axios.post(
    "https://chello-be-a5ll.onrender.com/workspace/createWorkspace",
    data,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};
