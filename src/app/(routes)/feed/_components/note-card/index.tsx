import type { Note } from "@/src/types/notes";
import type { User } from "@/src/types/user";

const NoteCard = ({ note, user }: { note: Note; user: User | null }) => {
	return (
		<div key={note.id} className="p-4">
			<div className="flex items-center gap-2 text-zinc-300">
				<span>@{user?.username}</span>
			</div>
			<div>
				<p>{note.content}</p>
			</div>
		</div>
	);
};

export { NoteCard };
