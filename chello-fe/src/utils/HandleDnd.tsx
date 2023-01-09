import { DropResult } from "react-beautiful-dnd";
import { patchDndItem } from "../apis/item.api";
// import { DndInterface } from "../types";

export const handleDragEnd = async (
  result: DropResult,
  workspaceId: string | undefined
) => {
  const { destination, source } = result;

  //   console.log(workspaceId);
  //   console.log(source);
  //   console.log(destination);

  if (
    !destination ||
    (destination.index === source.index &&
      destination.droppableId === source.droppableId)
  ) {
    return;
  } else {
    // const data: DndInterface[] = [source, destination];
    const data: any = {
      source,
      destination,
    };
    await patchDndItem(workspaceId, data);
  }
};
