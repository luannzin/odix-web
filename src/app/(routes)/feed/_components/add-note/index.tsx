import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddNote = ({
	handleSubmit,
}: {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<Input name="content" placeholder="O que está acontecendo?" />
			<Button type="submit" className="w-fit">
				<b>Anotar</b>
			</Button>
		</form>
	);
};

export { AddNote };
