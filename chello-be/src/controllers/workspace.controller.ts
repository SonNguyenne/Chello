import { Request, Response } from "express";
// import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore } from 'firebase-admin/firestore';

const index = (req: Request, res: Response) => {
  res.send("workspace index");
};

const createWorkspace = async (req: Request, res: Response) => {
  const db = getFirestore()
  

  const docRef = await db.collection('cities');

  console.log(docRef)
  // await docRef.set({
  //   first: 'Ada',
  //   last: 'Lovelace',
  //   born: 1815
  // });

  // docRef.forEach((doc) => {
  //   console.log(doc.id, '=>', doc.data());
  // });
}

export { index, createWorkspace } ;
