import { Request, Response } from "express";
import {
  createUserWithEmailAndPassword,
  getAuth,
  // sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

const index = (req: Request, res: Response) => {
  res.send("authen index");
};

const login = async (req: Request, res: Response) => {
  console.log('longinnn')
  const auth = getAuth();
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdTokenResult();
      console.log("authhthtt", token);
      return res.json({
        auth: token.token,
        // userName: user.displayName,
        email: user.email,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(errorCode).json({
        errorCode,
        errorMessage,
      });
    });
};

const signup = (req: Request, res: Response) => {
  const auth: any = getAuth();
  // console.log('authh',auth.currentUser)
  // sendEmailVerification(auth.currentUser).then(() => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        return res.json({message: 'Đăng ký thành công'})
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        return res.json({message: 'lỗi r', errorMessage})
      });
  // });
  
};

export { index, login, signup };
