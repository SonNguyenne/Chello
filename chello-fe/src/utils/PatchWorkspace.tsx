import { patchWorkspace } from "../apis/workspace.api";

// Handle isPublic: private / public
export const handleSubmitIsPublic = async (
  workspaceId?: string,
  isPublic?: boolean
) => {
  await patchWorkspace({ isPublic: !isPublic }, workspaceId);
};

// Handle isFavorite
export const handleSubmitIsFavorite = async (
  workspaceId?: string,
  isFavorite?: boolean
) => {
  await patchWorkspace({ isFavorite: !isFavorite }, workspaceId);
};
