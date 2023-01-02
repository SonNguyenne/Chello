import { Request, Response } from "express";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore/lite";

const index = (req: Request, res: Response) => {
  res.send("profike index");
};

const getCards = async (req: Request, res: Response) => {
    const db = getFirestore()

    const val:any [] = []
    
    const cardCol = collection(db, 'workspace',req.params.workspace,'card');
    
    const cardSnapshot = await getDocs(cardCol);
    
    await Promise.all(
        cardSnapshot.docs.map(async doc =>{
        const itemCol = collection(db, 'workspace',req.params.workspace,'card',doc.id,'item');
        
        const itemSnapshot = await getDocs(itemCol);
        
        const item = itemSnapshot.docs.map(doc => doc.data());

        val.push({
            cardId: doc.id,
            cardName: doc.data().cardName,
            isActived: doc.data().isActived,
            items: item
        })
        console.log(val)
    })
    )
    
    return res.json(val)  
}

const createCard = async (req: Request, res: Response) => {
    const db = getFirestore()
  
    // const data: Workspace[] = []
      
    const newCard: any = {
        cardName: req.body.cardName,
        isActived: true,
      }
    
    await addDoc(collection(db, 'workspace',req.params.workspace,'card'),newCard);
    
  
    return res.json(newCard).status(200);
}
export { index, getCards, createCard };
