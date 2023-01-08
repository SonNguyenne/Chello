export interface WorkspaceInterface {
  workspaceId?: string;
  workspaceName?: string;
  workspaceImage?: string;
  isFavorite?: boolean;
  isPublic?: boolean;
}

export interface CardInterface {
  cardId?: string;
  cardName?: string;
  index?: number;
}

export interface ItemInterface {
  itemId?: string;
  itemName?: string;
  description?: string;
  label?: string;
  background?: string;
  deadline?: Date;
}

export interface TodoListInterface {
  todoListId?: string;
  description?: string;
  isDone?: boolean;
}

export interface UserInterface {
  userId?: string;
  username?: string;
  mail?: string;
  password?: string;
  avatar?: string;
}
