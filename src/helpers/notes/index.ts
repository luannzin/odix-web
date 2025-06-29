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
};

export { addNote };
