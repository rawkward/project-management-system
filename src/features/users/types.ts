export type ApiUser = {
  id: number;
  fullName: string;
  email: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
  avatarUrl: string;
};

export type UserOption = {
  id: number;
  fullName: string;
  avatarUrl: string;
};