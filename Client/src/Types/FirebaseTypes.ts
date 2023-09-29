import { DocumentReference } from "@firebase/firestore-types";

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
  locationColumn: DocumentReference[];
  locationDate: Date[];
};

export type TColumn = {
  id: string;
  title: string;
  tasks: TTask[];
  createdDate: Date;
  archived: boolean;
  archivedDate: Date | null;
  backLog: boolean;
};

export type history = {
  user: TUser;
  date: Date;
  action: string;
};

export type TBoard = {
  id: string;
  ownerID: TUser;
  title: string;
  columns: TColumn[];
  adminUsers: TUser[];
  memberUsers: TUser[];
  history: history[];
  archived: TTask[];
};

export type userContribution = {
  user: TUser;
  tasksAllocated: number;
};

export type memberOverview = {
  totalTasks: number;
  userContribution: userContribution[];
};
