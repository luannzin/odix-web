import { getUser } from "./user";

const getAuth = async () => {
	const user = await getUser();

	return {
		user,
	};
};

export { getAuth };
