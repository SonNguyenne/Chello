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
import _ from "lodash";
interface Workspace {
  workspaceId?: string;
  isPublic?: boolean;
  isFavorite?: boolean;
  workspaceName?: string;
  workspaceImage?: string;
}

const createWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore();

  // const wsTable = collection(db, 'workspace');

  //getID by doc
  // const wsDoc =  doc(wsTable);
  // const wsId = wsSnapshot.docs.map(doc => doc.id);

  // Set/ update
  //  await setDoc(doc(db, "table", "ID"), {
  //   name: "dit me may",
  //   state: "CA",
  //   country: "USA",
  // });

  //Add
  const newWs: Workspace = {
    isPublic: true,
    isFavorite: false,
    workspaceName: req.body.workspaceName,
    workspaceImage:
      "https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-relay.png",
  };

  await addDoc(collection(db, "workspace"), newWs);

  return res.json(newWs);
};

const getWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore();
  let data: Workspace[] = [];
  // const wsCol = collection(db, "workspace");
  // const wsSnapshot = await getDocs(wsCol);
  // wsSnapshot.docs.map((doc) => {
  //   data.push({
  //     workspaceId: doc.id,
  //     isPublic: doc.data().isPublic,
  //     isFavorite: doc.data().isFavorite,
  //     workspaceName: doc.data().workspaceName,
  //     workspaceImage: doc.data().workspaceImage,
  //   });
  // });
  // return res.json(data);
  await getDocs(collection(db, "workspace")).then((snap) => {
    snap.docs.map((doc) => {
      data.push({ workspaceId: doc.id, ...doc.data() });
    });
  });
  return res.json(data);
};

const updateWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore();
  await setDoc(doc(db, "workspace", req.params.id), { ...req.body })
    .then(() => {
      return res.json(_.omit(req.body, "wsId"));
    })
    .catch(() => {
      return res.json({ message: "Cập nhật thất bại" });
    });
};

const getWorkspaceById = async (req: Request, res: Response) => {
  const db = getFirestore();
  await getDoc(doc(collection(db, "workspace"), req.params.id))
    .then((snap) => {
      return res.json(snap.data()).status(200);
    })
    .catch((err) => {
      return res.json(err.status);
    });
};

const patchWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore();
  await updateDoc(doc(collection(db, "workspace"), req.params.id), req.body)
    .then(() => {
      return res.json({ message: "Thay đổi thành công" }).status(200);
    })
    .catch(() => {
      return res.json({ message: "Thay đổi thất bại" }).status(400);
    });
};

const deleteWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore();
  await deleteDoc(doc(db, "workspace", req.params.id))
    .then(() => {
      return res.json({ message: "Xoá thành công" }).status(200);
    })
    .catch(() => {
      return res.json({ message: "Xóa thất bại" }).status(400);
    });
};
export {
  createWorkspace,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceById,
  patchWorkspace,
};
