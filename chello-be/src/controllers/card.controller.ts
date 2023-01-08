import { Request, Response } from "express";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { CardInterface, ReqParams } from "../interface";

const getCard = async (req: Request<ReqParams, {}, {}, {}>, res: Response) => {
  const db = getFirestore();

  const { params } = req;
  const workspaceId = params.workspaceId;

  let dataCard: CardInterface[] = [];
  await getDocs(collection(db, "workspace", workspaceId, "card")).then(
    (snap) => {
      snap.docs.map((doc) => {
        dataCard.push({ cardId: doc.id, ...doc.data() });
      });
    }
  );

  return res.json([...dataCard]);
};

const createCard = async (
  req: Request<ReqParams, {}, CardInterface, {}>,
  res: Response
) => {
  const db = getFirestore();
  const { params } = req;
  const workspaceId = params.workspaceId;

  let dataCard: CardInterface[] = [];
  await getDocs(collection(db, "workspace", workspaceId, "card")).then(
      (snap) => {
          snap.docs.map((doc) => {
              dataCard.push({ cardId: doc.id, ...doc.data() });
            });
        }
        );
    console.log(dataCard);

  const newCard: CardInterface = {
    cardName: req.body.cardName,
    isActived: true,
    index: dataCard.length + 1
  }; 

  await addDoc(collection(db, "workspace", workspaceId, "card"), newCard);
  return res.json(newCard).status(200);
};

const updateCard = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const db = getFirestore();
  const { params } = req;
  const workspaceId = params.workspaceId;
  const cardId = params.cardId;

  await setDoc(doc(db, "workspace", workspaceId, "card", cardId), {
    ...req.body,
  })
    .then(() => {
      return res.json(req.body);
    })
    .catch(() => {
      return res.json({ message: "Cập nhật thất bại" });
    });
};

const getCardById = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const db = getFirestore();
  const { params } = req;
  const workspaceId = params.workspaceId;
  const cardId = params.cardId;

  await getDoc(doc(collection(db, "workspace", workspaceId, "card"), cardId))
    .then((snap) => {
      return res.json(snap.data()).status(200);
    })
    .catch((err) => {
      return res.json(err.status);
    });
};

const patchCard = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const db = getFirestore();
  const { params } = req;
  const workspaceId = params.workspaceId;
  const cardId = params.cardId;

  await updateDoc(
    doc(collection(db, "workspace", workspaceId, "card"), cardId),
    req.body
  )
    .then(() => {
      return res.json({ message: "Thay đổi thành công" }).status(200);
    })
    .catch(() => {
      return res.json({ message: "Thay đổi thất bại" }).status(400);
    });
};

const deleteCard = async (
  req: Request<ReqParams, {}, {}, {}>,
  res: Response
) => {
  const db = getFirestore();
  const { params } = req;
  const workspaceId = params.workspaceId;
  const cardId = params.cardId;

  await deleteDoc(doc(db, "workspace", workspaceId, "card", cardId))
    .then(() => {
      return res.json({ message: "Xoá thành công" }).status(200);
    })
    .catch(() => {
      return res.json({ message: "Xóa thất bại" }).status(400);
    });
};

export { createCard, getCard, updateCard, deleteCard, getCardById, patchCard };
