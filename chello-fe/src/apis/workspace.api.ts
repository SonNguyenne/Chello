import axios from "axios";
import { WorkspaceInterface } from "../types";
import { apiUrl } from "./index.api";

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

export const deleteWorkspace = async (workspaceId: string | undefined) => {
  const res = await axios.delete(
    `${apiUrl}/workspace/deleteWorkspace/${workspaceId}`,
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
  workspaceId: string | undefined
) => {
  const res = await axios.put(
    `${apiUrl}/workspace/updateWorkspace/${workspaceId}`,
    workspace,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const patchWorkspace = async (
  workspace: WorkspaceInterface,
  workspaceId: string | undefined
) => {
  const res = await axios.put(
    `${apiUrl}/workspace/updateWorkspace/${workspaceId}`,
    workspace,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};
