import axios from "axios";
// import { CardInterface } from "../types";
import { apiUrl } from "./index.api";

export const fetchCard = async (workspaceId: string | undefined) => {
  const res = await axios.get(`${apiUrl}/workspace/${workspaceId}/card`, {
    headers: {
      contentType: "application/json",
    },
  });
  return res;
};

export const createCard = async (
  workspaceId: string | undefined,
  cardName: string
) => {
  const res = await axios.post(
    `${apiUrl}/workspace/${workspaceId}/card`,
    { cardName },
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

// export const deleteWorkspace = async (cardId: string | undefined) => {
//   const res = await axios.delete(`${apiUrl}/card/${cardId}`, {
//     headers: {
//       contentType: "application/json",
//     },
//   });
//   return res;
// };

// export const putWorkspace = async (
//   card: CardInterface,
//   cardId: string | undefined
// ) => {
//   const res = await axios.put(`${apiUrl}/card/${cardId}`, card, {
//     headers: {
//       contentType: "application/json",
//     },
//   });
//   return res;
// };

// export const patchWorkspace = async (
//   card: CardInterface,
//   cardId: string | undefined
// ) => {
//   const res = await axios.patch(
//     `${apiUrl}/card/${cardId}`,
//     card,
//     {
//       headers: {
//         contentType: "application/json",
//       },
//     }
//   );
//   return res;
// };

// export const getWorkspaceById = async (cardId: string | undefined) => {
//   const res = await axios.get(`${apiUrl}/card/${cardId}`, {
//     headers: {
//       contentType: "application/json",
//     },
//   });
//   return res;
// };