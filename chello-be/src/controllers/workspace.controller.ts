import { Request, Response } from "express";
import {  addDoc, collection ,deleteDoc,doc,getDocs,getFirestore, setDoc } from 'firebase/firestore/lite';
import _ from 'lodash'
interface Workspace {
  workspaceId?: string;
  isPublic: boolean
  isFavorite: boolean
  workspaceName: string
}

const index = (req: Request, res: Response) => {
  res.send("workspace index");
};

const createWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore()
  
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
    isPublic: req.body.isPublic,
    isFavorite: req.body.isFavorite,
    workspaceName:req.body.workspaceName
  }

  await addDoc(collection(db, "workspace"),newWs);


  return res.json(newWs);;
}

const getWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore()

  const data: Workspace[] = []

  const citiesCol = collection(db, 'workspace');
  
  const citySnapshot = await getDocs(citiesCol);
 
  citySnapshot.docs.map(doc => {
    data.push({
      workspaceId: doc.id,
      isPublic:  doc.data().isPublic,
      isFavorite:  doc.data().isFavorite,
      workspaceName: doc.data().workspaceName})
  });

  return res.json(data);
}


const updateWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore()

  // const citiesCol = collection(db, 'workspace');
  // const citySnapshot = await getDocs(citiesCol);
  // const wsList = citySnapshot.docs.map(doc => doc.data());
  // const wsId = citySnapshot.docs.map(doc => doc.id);
  // const data = { wsList}

   // Set/ update
  await setDoc(doc(db, "workspace", req.params.wsId), {
    isPublic: req.body.isPublic,
    isFavorite: req.body.isFavorite,
    workspaceName:req.body.workspaceName
  });


  return res.json(_.omit(req.body,'wsId'));
}


const deleteWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore()

  await deleteDoc(doc(db, "workspace", req.params.wsId));

  return res.json('deleted successfully');
}
export { index, createWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } ;

