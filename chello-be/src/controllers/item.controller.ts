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
  await getDocs(
    collection(db, "workspace", workspaceId, "card", cardId, "item")
  ).then((snap) => {
    snap.docs.map((doc) => {
      dataItem.push({ itemId: doc.id, ...doc.data() });
    });
  });

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

  let dataItem: any[] = [];
  await getDocs(
    collection(db, "workspace", workspaceId, "card", cardId, "item")
  ).then((snap) => {
    snap.docs.map((doc) => {
      dataItem.push({ itemId: doc.id, ...doc.data() });
    });
  });

  const newItem: any = {
    itemName: req.body.itemName,
    // description: req.body.description,
    // deadline: req.body.deadline,
    // background:req.body.background,
    index: dataItem.length == 0 ? 0 : dataItem.length,
  };

  await addDoc(
    collection(db, "workspace", workspaceId, "card", cardId, "item"),
    newItem
  );
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

  await setDoc(
    doc(db, "workspace", workspaceId, "card", cardId, "item", itemId),
    {
      ...req.body,
    }
  )
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

  await getDoc(
    doc(
      collection(db, "workspace", workspaceId, "card", cardId, "item"),
      itemId
    )
  )
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
    doc(
      collection(db, "workspace", workspaceId, "card", cardId, "item"),
      itemId
    ),
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

  await deleteDoc(
    doc(db, "workspace", workspaceId, "card", cardId, "item", itemId)
  )
    .then(() => {
      return res.json({ message: "Xoá thành công" }).status(200);
    })
    .catch(() => {
      return res.json({ message: "Xóa thất bại" }).status(400);
    });
};

const patchDndItem = async (
  req: any,
  res: Response
) => {
  const db = getFirestore();
  const { params } = req;
  const workspaceId = params.workspaceId;
  // const cardId = params.cardId;
  const source = req.body.source; 
  const destination = req.body.destination; 
  let thanhlz:any
  // itemId.map(async (item:any) => {
    const data = await getDocs(collection(db, "workspace", workspaceId, "card",source.droppableId,'item'))
    // console.log('dataItemmmmmmmmmmmmmmmm==========', item)
    data.docs.map((doc) => {
      console.log(doc.data(), doc.id,'oasddddddddddddddddddddddddd')
      if(source.index === doc.data().index){
        thanhlz = {itemId:doc.id, ...doc.data()}
        return thanhlz
      }
    }
    )
    console.log('check1',thanhlz)

    if(source.droppableId !== destination.droppableId){
      await deleteDoc(
        doc(db, "workspace", workspaceId, "card", source.droppableId, "item", thanhlz.itemId)
      )
      const dataSource = await getDocs(collection(db, "workspace", workspaceId, "card",source.droppableId,'item'))

      dataSource.docs.map(async (item) => {
        let data = item.data();
        if(data.index >= thanhlz.index){
          let indexTru =  data.index === 0 ? 0 : data.index - 1
          data.index = indexTru
        }
        await setDoc(
          doc(
            collection(db, "workspace", workspaceId, "card", source.droppableId, "item"),
            item.id
          ),
          data
        )
      })

      thanhlz.index = destination.index
      const data = await getDocs(collection(db, "workspace", workspaceId, "card",destination.droppableId,'item'))
      data.docs.map(async (item) => {
        let data = item.data();
        if(data.index >= thanhlz.index){
          let indexCong = data.index + 1
          data.index = indexCong
        }
        await setDoc(
          doc(
            collection(db, "workspace", workspaceId, "card", destination.droppableId, "item"),
            item.id
          ),
          data
        )
      })
      await addDoc(collection(db, "workspace", workspaceId, "card",destination.droppableId, "item"),thanhlz)
    }else if(destination.droppableId === source.droppableId){
      console.log('thaglzzz trennn', thanhlz)
      console.log('destination.index trennn', destination.index)

      thanhlz.index = destination.index
      console.log('thaglzzz', thanhlz)
      await updateDoc(
        doc(
          collection(db, "workspace", workspaceId, "card", source.droppableId, "item"),
          thanhlz.itemId
        ),
        thanhlz
      )

      let indexStart = source.index
      let indexEnd = destination.index
      const data = await getDocs(collection(db, "workspace", workspaceId, "card",destination.droppableId,'item'))
      data.docs.map(async (item) => {
        let data = item.data();
        if(indexStart < indexEnd){
          if(data.index > indexStart && data.index <= indexEnd){
            let indexCong = data.index - 1
            data.index = indexCong
          }
        }else if(indexStart > indexEnd){
          if(data.index < indexStart && data.index >= indexEnd){
            let indexCong = data.index + 1
            data.index = indexCong
          }
        }
        await setDoc(
          doc(
            collection(db, "workspace", workspaceId, "card", destination.droppableId, "item"),
            item.id
          ),
          data
        )
      })
    }
  };

export { createItem, getItem, updateItem, deleteItem, getItemById, patchItem, patchDndItem };
