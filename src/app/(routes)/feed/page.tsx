"use client";

import { addNote, getNotes } from "@/src/helpers/notes";
import { useEffect, useState } from "react";
import type { Note } from "@/src/types/notes";
import { AddNote } from "./_components/add-note";
import { NoteCard } from "./_components/note-card";
import type { User } from "@/src/types/user";
import { getUser } from "@/src/helpers/auth/user";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Feed() {
	const [skeletonArray, setSkeletonArray] = useState<number[]>(
		Array.from({ length: 5 }, (_, index) => index),
	);
	const [notes, setNotes] = useState<Note[]>([]);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const notes = await getNotes();
				setNotes(notes);
			} catch (e) {
				const err = e as Error;
				toast.error(err.message);
			} finally {
				setSkeletonArray([]);
			}
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
		try {
			// setSkeletonArray([...skeletonArray, skeletonArray.length + 1]);

			const formData = new FormData(e.target as HTMLFormElement);
			const content = formData.get("content") as string;
			const note = await addNote({ content });

			(e.target as HTMLFormElement).reset();

			setNotes([note, ...notes]);
		} catch (e) {
			const err = e as Error;
			toast.error(err.message);
		}
	};

	return (
		<div className="divide-y divide-zinc-800 max-md:border-0 border-zinc-800 border-2 border-y-0 h-screen flex flex-col">
			<div className="p-4">
				<span>Picture</span>
			</div>
			<div className="p-4">
				<AddNote handleSubmit={handleSubmit} />
			</div>
			<div className="divide-y divide-zinc-800 overflow-y-auto h-full flex flex-col">
				{skeletonArray.map((index) => (
					<div key={index} className="p-4">
						<Skeleton className="w-full h-12" />
					</div>
				))}
				{notes.map((note) => (
					<NoteCard key={note.id} note={note} user={user} />
				))}
			</div>
			<div className="p-4">
				<span>Navbar</span>
			</div>
		</div>
	);
}
