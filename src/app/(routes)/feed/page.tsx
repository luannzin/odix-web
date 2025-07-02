"use client";

import { pipeline } from "@huggingface/transformers";
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
