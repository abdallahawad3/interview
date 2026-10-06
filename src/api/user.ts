import type { User } from "../types/users";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async (signal?: AbortSignal): Promise<User[]> => {
  const response = await fetch(USERS_URL, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
