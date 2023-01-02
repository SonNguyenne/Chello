import { Request, Response } from "express";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";


const index = (req: Request, res: Response) => {
  res.send("dashboard index");
};

const getCards = async (req: Request, res: Response) => {
  const db = getFirestore()

  // const data: Cards[] = []

  const wsCol = collection(db, 'workspace');
  
  const citySnapshot = await getDocs(wsCol);
 
  citySnapshot.docs.map(doc => { doc.data()
    // data.push({
    //   workspaceId: doc.id,
    //   isPublic:  doc.data().isPublic,
    //   isFavorite:  doc.data().isFavorite,
    //   workspaceName: doc.data().workspaceName,
    //   workspaceImage: doc.data().workspaceImage})
  });

  // return res.json(data);
}


export { index, getCards };
