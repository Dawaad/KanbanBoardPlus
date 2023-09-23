export type TDashTile = {
  boardID: string;
  boardName: string;
  owner: boolean;
};

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
  archivedDate: Date | null;
  locationColumn: TColumn[];
  locationDate: Date[];
};

export type TColumn = {
  id: string;
  title: string;
  tasks: TTask[];
  createdDate: Date;
  archived: boolean;
  archivedDate: Date | null;
  backLog: boolean
};

export type TBoard = {
  id: string;
  ownerID: TUser;
  title: string;
  columns: TColumn[];
  adminUsers: TUser[];
  memberUsers: TUser[];
};
