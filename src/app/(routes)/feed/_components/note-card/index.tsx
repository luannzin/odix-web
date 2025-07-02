"use client";

import type { Note } from "@/src/types/notes";
import type { User } from "@/src/types/user";
import { Options } from "./_components/options";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NoteCard = ({ note, user }: { note: Note; user: User | null }) => {
	const [open, setOpen] = useState(false);

	return (
		<div key={note.id} className={cn("p-4 flex flex-col gap-2")}>
			<div className="flex items-center justify-between gap-2 text-zinc-300">
				<span>
					@{user?.username} -{" "}
					{note.meta.created_at.toLocaleString("pt-BR", {
						dateStyle: "short",
						timeStyle: "short",
					})}
				</span>
				<Options open={open} setOpen={setOpen} />
			</div>
			<div>
				<p>{note.content}</p>
			</div>
		</div>
	);
};

export { NoteCard };
