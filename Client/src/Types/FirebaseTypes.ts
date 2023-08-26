export type TUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  assignedBoards: string[];
};

export type TTask = {
  id: string;
  title: string;
  description: string;
  assignedUsers: TUser[];
  assignedDate: Date;
  completedDate: Date | null;
};

export type TColumn = {
  id: string;
  title: string;
  tasks: TTask[];
};

export type TBoard = {
  id: string;
  ownerID: TUser;
  title: string;
  columns: Map<string, TColumn>;
  adminUsers: TUser[];
  memberUsers: TUser[];
};
