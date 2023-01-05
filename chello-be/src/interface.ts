export interface WorkspaceInterface {
  workspaceId?: string;
  isPublic?: boolean;
  isFavorite?: boolean;
  workspaceName?: string;
  workspaceImage?: string;
}

export interface CardInterface {
  cardId?: string;
  cardName?: string;
  isActived?: boolean;
}

export interface ReqParams {
  workspaceId: string;
  cardId: string;
  itemId: string;
  todoListId: string;
}
