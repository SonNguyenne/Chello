
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
import { ReqParams } from "../interface";


const getItem = async (req: Request<ReqParams, {}, {}, {}>, res: Response) => {
    const db = getFirestore();
  
    const { params } = req;
    const workspaceId = params.workspaceId;
    const cardId = params.cardId;


    let dataItem: any[] = [];
    await getDocs(collection(db, "workspace", workspaceId, "card", cardId, 'item')).then(
      (snap) => {
          snap.docs.map((doc) => {    
          dataItem.push({ itemId: doc.id, ...doc.data() });
        });
      }
    );
  
    return res.json([...dataItem]);
  };
  
  
  const createItem = async (
    req: Request<ReqParams, {}, any, {}>,
    res: Response
  ) => {
    const db = getFirestore();
    const { params } = req;
    const workspaceId = params.workspaceId;
    const cardId = params.cardId;
  
    const newItem: any = {
      itemName: req.body.itemName,
      description: req.body.description,
      deadline: req.body.deadline,
      background:req.body.background,
    };
    
    await addDoc(collection(db, "workspace", workspaceId, "card", cardId, 'item'), newItem);
    return res.json(newItem).status(200);
  };
  
  const updateItem = async (
    req: Request<ReqParams, {}, {}, {}>,
    res: Response
  ) => {
    const db = getFirestore();
    const { params } = req;
    const workspaceId = params.workspaceId;
    const cardId = params.cardId;
    const itemId = params.itemId;
  
    await setDoc(doc(db, "workspace", workspaceId, "card", cardId, 'item', itemId), {
      ...req.body,
    })
      .then(() => {
        return res.json(req.body);
      })
      .catch(() => {
        return res.json({ message: "Cập nhật thất bại" });
      });
  };
  
  const getItemById = async (
    req: Request<ReqParams, {}, {}, {}>,
    res: Response
  ) => {
    const db = getFirestore();
    const { params } = req;
    const workspaceId = params.workspaceId;
    const cardId = params.cardId;
    const itemId = params.itemId;

  
    await getDoc(doc(collection(db, "workspace", workspaceId, "card", cardId, 'item'), itemId))
      .then((snap) => {
        return res.json(snap.data()).status(200);
      })
      .catch((err) => {
        return res.json(err.status);
      });
  };
  
  const patchItem = async (
    req: Request<ReqParams, {}, {}, {}>,
    res: Response
  ) => {
    const db = getFirestore();
    const { params } = req;
    const workspaceId = params.workspaceId;
    const cardId = params.cardId;
    const itemId = params.itemId;

    
    await updateDoc(
      doc(collection(db, "workspace", workspaceId, "card", cardId, 'item'), itemId),
      req.body
    )
      .then(() => {
        return res.json({ message: "Thay đổi thành công" }).status(200);
      })
      .catch(() => {
        return res.json({ message: "Thay đổi thất bại" }).status(400);
      });
  };
  
  const deleteItem = async (
    req: Request<ReqParams, {}, {}, {}>,
    res: Response
  ) => {
    const db = getFirestore();
    const { params } = req;
    const workspaceId = params.workspaceId;
    const cardId = params.cardId;
    const itemId = params.itemId;
  
    await deleteDoc(doc(db, "workspace", workspaceId, "card", cardId, 'item', itemId))
      .then(() => {
        return res.json({ message: "Xoá thành công" }).status(200);
      })
      .catch(() => {
        return res.json({ message: "Xóa thất bại" }).status(400);
      });
  };
  
export {  createItem, getItem, updateItem, deleteItem, getItemById, patchItem  };
