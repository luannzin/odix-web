"use client";

import { addNote, getNotes } from "@/src/helpers/notes";
import { useEffect, useState } from "react";
import type { Note } from "@/src/types/notes";
import { AddNote } from "./_components/add-note";
import { NoteCard } from "./_components/note-card";
import type { User } from "@/src/types/user";
import { getUser } from "@/src/helpers/auth/user";

export default function Feed() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchNotes = async () => {
			const notes = await getNotes();
			setNotes(notes);
		};
		fetchNotes();
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser();
			setUser(user);
		};
		fetchUser();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const content = formData.get("content") as string;
		const note = await addNote({ content });

		(e.target as HTMLFormElement).reset();

		setNotes([...notes, note]);
	};

	return (
		<div className="divide-y divide-zinc-800 max-md:border-0 border-zinc-800 border-2 border-t-0">
			<div className="p-4">
				<span>Picture</span>
			</div>
			<div className="p-4">
				<AddNote handleSubmit={handleSubmit} />
			</div>
			<div className="divide-y divide-zinc-800">
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} user={user} />
				))}
			</div>
		</div>
	);
}
