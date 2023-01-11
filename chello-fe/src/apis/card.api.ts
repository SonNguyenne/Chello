import axios from "axios";
import { CardInterface } from "../types";
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

export const deleteCard = async (
  workspaceId: string | undefined,
  cardId: string | undefined
) => {
  const res = await axios.delete(
    `${apiUrl}/workspace/${workspaceId}/card/${cardId}`,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const patchCard = async (
  workspaceId: string | undefined,
  cardId: string | undefined,
  card: CardInterface
) => {
  const res = await axios.patch(
    `${apiUrl}/workspace/${workspaceId}/card/${cardId}`,
    card,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const getCardById = async (
  workspaceId: string | undefined,
  cardId: string | undefined
) => {
  const res = await axios.get(
    `${apiUrl}/workspace/${workspaceId}/card/${cardId}`,
    {
      headers: {
        contentType: "application/json",
      },
    }
  );
  return res;
};

export const patchIndexCard = async (
  workspaceId: string | undefined,
  cardId: string | undefined,
  card: CardInterface
) => {
  const cards = await fetchCard(workspaceId);
  const currentCard = await getCardById(workspaceId, cardId);
  const currentIndex = currentCard.data.index;

  const forwardIndex = card.index;
  let forwardCard: CardInterface = {};
  cards.data.map((card: CardInterface) => {
    if (card.index === forwardIndex) {
      return (forwardCard = card);
    }
    return 0;
  });

  await patchCard(workspaceId, cardId, { index: forwardIndex });
  await patchCard(workspaceId, forwardCard.cardId, { index: currentIndex });
};
