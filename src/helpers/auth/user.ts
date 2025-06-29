import { auth_store } from "@/src/db/auth";
import type { User } from "@/src/types/user";

const getUser = async () => {
	const user = await auth_store.getItem("user");
	return user as User;
};

const addUser = async (user: User) => {
	await auth_store.setItem("user", user);
};

export { getUser, addUser };
