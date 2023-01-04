import axios from "axios";
import { WorkspaceInterface } from "../types";

// const apiUrl = "https://chello-be-a5ll.onrender.com";
const apiUrl = "https://chello-api.onrender.com";

export const fetchWorkspace = async () => {
  const res = await axios.get(`${apiUrl}/workspace/getWorkspace`, {
    headers: {
      contentType: "application/json",
    },
  });
  return res;
};

export const createWorkspace = async (workspace: WorkspaceInterface) => {
  const res = await axios.post(
    `${apiUrl}/workspace/createWorkspace`,
    workspace,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const deleteWorkspace = async (workspace: WorkspaceInterface) => {
  const res = await axios.post(
    `${apiUrl}/workspace/deleteWorkspace`,
    workspace,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const putWorkspace = async (
  workspace: WorkspaceInterface,
  workspaceId: string
) => {
  const res = await axios.put(`${apiUrl}/workspace/${workspaceId}`, workspace, {
    headers: {
      contentType: "application/json",
    },
  });
  return res;
};
