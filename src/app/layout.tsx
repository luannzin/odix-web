import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

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
		<html lang="pt-BR">
			<body className={`${roboto.className} antialiased`}>{children}</body>
		</html>
	);
}
