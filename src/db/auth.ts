import localforage from "localforage";

const auth_store = localforage.createInstance({
	driver: localforage.INDEXEDDB,
	name: "odix",
	version: 1.0,
	size: 1024 * 1024 * 10, // 10MB
	storeName: "auth",
	description: "Odix app auth database",
});

export { auth_store };
