import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
	title: "Odix - An offline note taking app",
	description:
		"Odix is an offline note taking app that allows you to take notes.",
};

const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "700"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className="dark">
			<body
				className={`${roboto.className} antialiased flex justify-center max-w-screen overflow-x-hidden`}
			>
				<main className="max-w-screen-md w-full min-h-screen max-sm:px-8">
					<NextTopLoader color="#0ea5e9" showSpinner={false} />
					<Toaster richColors closeButton />
					{children}
				</main>
			</body>
		</html>
	);
}
