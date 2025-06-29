"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuth } from "../helpers/auth";
import type { User } from "../types/user";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { addUser } from "../helpers/auth/user";

export default function Home() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [full_name_id, username_id] = [useId(), useId()];

	const [user, setUser] = useState<User | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const formData = new FormData(e.target as HTMLFormElement);
			const full_name = formData.get("full_name") as string;
			const username = formData.get("username") as string;

			console.log(formData);

			if (!full_name || !username) {
				throw new Error("Nome completo e nome de usuário são obrigatórios");
			}

			const new_user: User = {
				full_name,
				username,
				meta: {
					created_at: new Date(),
					updated_at: new Date(),
				},
			};

			await addUser(new_user);
			router.push("/feed");
		} catch (e) {
			const err = e as Error;
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const loadUser = async () => {
		setLoading(true);
		const { user } = await getAuth();
		setUser(user);
		setLoading(false);
	};

	useEffect(() => {
		loadUser();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (user) {
		return router.push("/feed");
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<form onSubmit={handleSubmit} className="flex flex-col w-96 gap-8">
				<div>
					<h2 className="text-2xl font-bold">Odix</h2>
					<p>Um app de anotações que funciona offline</p>
				</div>
				<div className="flex flex-col gap-4">
					<div>
						<label htmlFor={full_name_id}>Nome completo</label>
						<Input
							id={full_name_id}
							name="full_name"
							placeholder="João Fulano"
						/>
					</div>
					<div>
						<label htmlFor={username_id}>Nome de usuário</label>
						<Input
							prefix="@"
							id={username_id}
							name="username"
							placeholder="@username"
						/>
					</div>
				</div>
				<Button type="submit">Continuar</Button>
			</form>
		</div>
	);
}
