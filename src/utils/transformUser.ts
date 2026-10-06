import type { User, UserRow } from "../types/users";

export const transformUser = (user: User): UserRow => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    company: user.company.name,
    city: user.address.city,
  };
};
