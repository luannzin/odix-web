import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="flex flex-col gap-12">
				<div className="text-center gap-4 flex flex-col">
					<div className="flex flex-col items-center gap-8">
						<Search size={48} className="text-zinc-50" />
						<h1 className="text-4xl text-zinc-400">
							Welcome to <b className="text-zinc-50">Odix.</b>
						</h1>
					</div>
					<p className="text-lg text-zinc-400">
						Take note of your memorable and important things.
					</p>
				</div>
				<div>
					<Link href="/username" prefetch>
						<Button type="button" className="max-w-lg w-full py-2 h-fit">
							<b className="text-lg">Continue</b>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
