import { notes_store } from "@/src/db/notes";
import type { Note } from "@/src/types/notes";

const addNote = async (note: Partial<Note>) => {
	const note_id = crypto.randomUUID();

	const new_note: Note = {
		id: note_id,
		title: note.title || "",
		content: note.content || "",
		meta: {
			created_at: new Date(),
			updated_at: new Date(),
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

	return notes_data;
};

const getNote = async (note_id: string) => {
	const note = await notes_store.getItem(note_id);
	return note;
};

export { addNote, getNotes, getNote };
