import { DndInterface } from "./../types";
import axios from "axios";
import { ItemInterface } from "../types";
import { apiUrl } from "./index.api";

export const fetchItem = async (
  workspaceId: string | undefined,
  cardId: string | undefined
) => {
  const res = await axios.get(
    `${apiUrl}/workspace/${workspaceId}/card/${cardId}/item`,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const createItem = async (
  workspaceId: string | undefined,
  cardId: string | undefined,
  itemName: string | undefined
) => {
  const res = await axios.post(
    `${apiUrl}/workspace/${workspaceId}/card/${cardId}/item`,
    { itemName },
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const deleteItem = async (
  workspaceId: string | undefined,
  cardId: string | undefined,
  itemId: string | undefined
) => {
  const res = await axios.delete(
    `${apiUrl}/workspace/${workspaceId}/card/${cardId}/item/${itemId}`,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

// export const putWorkspace = async (
//   card: ItemInterface,
//   cardId: string | undefined
// ) => {
//   const res = await axios.put(`${apiUrl}/card/${cardId}`, card, {
//     headers: {
//       contentType: "application/json",
//     },
//   });
//   return res;
// };

export const patchItem = async (
  workspaceId: string | undefined,
  cardId: string | undefined,
  itemId: string | undefined,
  item: ItemInterface
) => {
  const res = await axios.patch(
    `${apiUrl}/workspace/${workspaceId}/card/${cardId}/item/${itemId}`,
    item,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const patchDndItem = async (
  workspaceId: string | undefined,
  dndItem: DndInterface
) => {
  console.log(dndItem);

  const res = await axios.post(
    `${apiUrl}/workspace/${workspaceId}/card/item`,
    dndItem,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};
