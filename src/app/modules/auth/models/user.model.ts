export interface User {
  name: string;
  email: string;
  displayName?: string;
  password: string;
}

export interface CurrentUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  bio: string | null;
  image: string | null;
  token: string;
}
