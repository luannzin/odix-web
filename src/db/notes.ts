import localforage from "localforage";

const notes_store = localforage.createInstance({
	driver: localforage.INDEXEDDB,
	name: "odix",
	version: 1.0,
	size: 1024 * 1024 * 512, // 512MB
	storeName: "notes",
	description: "Odix app database",
});

export { notes_store };
