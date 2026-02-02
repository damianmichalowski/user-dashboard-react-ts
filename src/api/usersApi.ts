import { api } from "./axios";
import type { ApiUser, User } from "@/types/user";

export async function fetchUsersApi() {
  const { data } = await api.get<ApiUser[]>("/users");
  return data;
}

export async function createUserApi(user: Omit<User, "id" | "source">) {
  const { data } = await api.post<ApiUser>("/users", user);
  return data;
}