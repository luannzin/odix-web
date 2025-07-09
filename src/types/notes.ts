import type { Meta } from "./meta";

type Note = {
	id: string;
	content: string;
	meta: Meta;
	user: {
		username: string;
	};
};

export type { Note };
