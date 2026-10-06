import type { User } from "../types/users";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${USERS_URL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
