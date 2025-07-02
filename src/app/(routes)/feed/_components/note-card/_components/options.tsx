import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { MoreHorizontal } from "lucide-react";

const Options = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) => {
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger>
				<MoreHorizontal className="w-4 h-4" />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Opções</DrawerTitle>
				</DrawerHeader>
				<DrawerFooter>
					<Button variant="outline">Editar</Button>
					<Button variant="destructive" className="w-full">
						Apagar
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export { Options };
