import { notes_store } from "@/src/db/notes";
import type { Note } from "@/src/types/notes";

const addNote = async ({
	content,
	user,
}: {
	content: string;
	user: {
		username: string;
	};
}) => {
	const note_id = crypto.randomUUID();

	if (!content) {
		throw new Error("Insira um conteúdo para a nota.");
	}

	const new_note: Note = {
		id: note_id,
		content: content || "",
		meta: {
			created_at: new Date(),
			updated_at: new Date(),
		},
		user: {
			username: user.username || "",
		},
	};

	await notes_store.setItem(note_id, new_note);

	return new_note;
};

const getNotes = async () => {
	const notes = await notes_store.keys();
	const notes_data = (await Promise.all(
		notes.map(async (note) => {
			const note_data = await notes_store.getItem(note);
			return note_data;
		}),
	)) as Note[];

	return notes_data.sort((a, b) => {
		return b.meta.created_at.getTime() - a.meta.created_at.getTime();
	});
};

const getNote = async (note_id: string) => {
	const note = await notes_store.getItem(note_id);
	return note;
};

export { addNote, getNotes, getNote };
