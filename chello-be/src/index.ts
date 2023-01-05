import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { webRoutes } from "./routes/index";
import { db } from "./configs/firebase";
// import { initializeApp } from "firebase-admin";

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect firebase
db();

// initializeApp();

webRoutes(app);
app.get("/", (req: any, res: any) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log(`Link: http://localhost:${3000}`);
});
