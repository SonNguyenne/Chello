import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const handleDragEnd = (result: DropResult) => {
  const { destination, source } = result;

  console.log(source);
  console.log(destination);

  if (!destination) return;

  if (
    destination.index === source.index ||
    destination.droppableId === source.droppableId
  )
    return;
};

root.render(
  // <React.StrictMode>
  <Router>
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
      <App />
    </DragDropContext>
  </Router>
  // </React.StrictMode>
);
reportWebVitals();
