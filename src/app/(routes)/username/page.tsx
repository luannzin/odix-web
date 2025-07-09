"use client";

import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { addUser } from "@/src/helpers/auth/user";
import { useRouter } from "next/navigation";

export default function Home() {
	const username_id = useId();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const formData = new FormData(e.currentTarget);
			const username = formData.get("username") as string;
			if (!username) {
				toast.error("An username is required.");
				return;
			}

			await addUser({
				username,
				full_name: "",
				meta: {
					created_at: new Date(),
					updated_at: new Date(),
				},
			});

			router.push("/notes/feed");
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full h-full flex items-center justify-center py-16">
			<div className="w-full h-full flex flex-col gap-4">
				<Link href="/" prefetch>
					<div className="w-10 h-10 flex items-center justify-center bg-zinc-800/25 hover:bg-zinc-800 transition-all duration-150 rounded-full cursor-pointer">
						<ChevronLeft size={20} className="text-zinc-50" />
					</div>
				</Link>
				<div className="w-full h-full flex items-center justify-center">
					<div className="max-w-lg w-full flex flex-col gap-4">
						<label htmlFor={username_id} className="w-full">
							<h1 className="text-4xl text-zinc-50">
								<b>Enter your username</b>
							</h1>
						</label>
						<form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
							<Input
								type="text"
								name="username"
								id={username_id}
								placeholder="johnfulano"
								className="w-full py-5 text-lg!"
							/>
							<Button
								type="submit"
								className="w-full py-2 h-fit flex items-center justify-center gap-2"
								disabled={isLoading}
							>
								{isLoading && <Loader2 size={24} className="animate-spin" />}
								<span
									className={cn(
										"text-lg font-semibold",
										isLoading && "text-zinc-500",
									)}
								>
									{isLoading ? "Loading..." : "Next"}
								</span>
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
