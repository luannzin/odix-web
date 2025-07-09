"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addNote, getNotes } from "@/src/helpers/notes";
import type { User } from "@/src/types/user";
import type { Note } from "@/src/types/notes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUser } from "@/src/helpers/auth/user";

export default function Feed() {
	const [user, setUser] = useState<User | null>(null);
	const [notes, setNotes] = useState<Note[]>([]);
	const [content, setContent] = useState("");

	// function cosineSimilarity(a, b) {
	// 	const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
	// 	const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
	// 	const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
	// 	return dot / (normA * normB);
	// }

	// const main = async () => {
	// 	try {
	// 		const pipe = await pipeline(
	// 			"embeddings",
	// 			"Xenova/paraphrase-multilingual-MiniLM-L12-v2",
	// 		);
	// 		const query = "receitas com peixe";

	// 		const notes = [
	// 			"Comi sushi com shoyu ontem à noite.",
	// 			"Estava pescando com meu pai no fim de semana.",
	// 			"Vi um documentário sobre tubarões no Discovery.",
	// 			"Fui ao mercado comprar peixe fresco.",
	// 			"Assisti um filme japonês com muita comida típica.",
	// 			"Corri 5km no parque logo cedo.",
	// 			"Fiz uma receita nova de salmão grelhado.",
	// 			"Sonhei que estava nadando com golfinhos.",
	// 			"Fui no petshop comprar ração para o cachorro.",
	// 			"Preparei uma feijoada para os amigos.",
	// 			"Estudei matemática a tarde inteira.",
	// 			"Tomei banho de mar em Arraial do Cabo.",
	// 			"Li um artigo sobre alimentação saudável com peixes.",
	// 			"Joguei bola com os amigos na quadra da escola.",
	// 			"Encontrei uma receita deliciosa de moqueca capixaba.",
	// 		];

	// 		const queryEmbedding = await pipe(query);

	// 		const results = await Promise.all(
	// 			notes.map(async (note) => {
	// 				const noteEmbedding = await pipe(note);
	// 				const score = cosineSimilarity(
	// 					queryEmbedding.data,
	// 					noteEmbedding.data,
	// 				);
	// 				return { note, score };
	// 			}),
	// 		);

	// 		const scores = results.map((r) => r.score);
	// 		const avg = scores.reduce((a, b) => a + b) / scores.length;
	// 		const threshold = avg + 0.03;

	// 		const relevantes = results.filter((r) => r.score >= threshold);

	// 		const sorted = results.sort((a, b) => b.score - a.score);
	// 		console.log("Notas mais relevantes para:", query);
	// 		console.log(sorted);
	// 		console.log(relevantes);
	// 	} catch (e) {
	// 		const err = e as Error;
	// 		toast.error(err.message);
	// 	}
	// };

	// useEffect(() => {
	// 	main();
	// }, []);

	const loadNotes = async () => {
		const notes = await getNotes();
		setNotes(notes);
	};

	useEffect(() => {
		loadNotes();
	}, []);

	const loadUser = async () => {
		const user = await getUser();
		setUser(user);
	};

	useEffect(() => {
		loadUser();
	}, []);

	const onNoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!content) {
				toast.error("Please enter a note.");
				return;
			}

			const new_note = await addNote({
				content,
				user: {
					username: user?.username || "",
				},
			});

			setNotes((prev) => [new_note, ...prev]);

			toast.success("Note added successfully.");
			setContent("");
		} catch (error) {
			console.error(error);
			toast.error("Failed to add note.");
		} finally {
		}
	};
	return (
		<div className="flex flex-col gap-8">
			<div className="sm:px-8 pt-16 sticky top-0 bg-background">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<div className="flex gap-4">
							<Button
								variant={"ghost"}
								className="p-0 dark:hover:bg-transparent"
							>
								<b className="text-4xl">Feed</b>
							</Button>
							<Button
								variant={"ghost"}
								className="p-0 dark:hover:bg-transparent text-zinc-500"
							>
								<b className="text-4xl">Search</b>
							</Button>
						</div>
						<div>
							<span className="text-zinc-500">
								{new Date().toLocaleString("pt-BR", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
								})}
							</span>
						</div>
					</div>
					<form className="flex flex-col gap-4" onSubmit={onNoteSubmit}>
						<Textarea
							className="p-0 py-3 h-fit text-2xl! placeholder:text-zinc-500 bg-transparent dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
							placeholder="What's happening?"
							name="note"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<Button type="submit" disabled={!content} className="px-6 w-fit">
							<b className="text-lg">Note</b>
						</Button>
					</form>
				</div>
			</div>
			<div className="flex flex-col gap-2 sm:px-4">
				{notes.map((note) => (
					<div key={note.id} className="py-4 sm:px-4 rounded-xl flex flex-col gap-2">
						<span className="text-sm text-zinc-500">
							@{note.user.username} -{" "}
							{note.meta.created_at.toLocaleString("pt-BR", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
						<p>{note.content}</p>
					</div>
				))}
			</div>
		</div>
	);
}
