import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Odix",
		short_name: "Odix",
		description: "An offline note taking app",
		start_url: "/",
		display: "standalone",
		background_color: "#0e0e10",
		theme_color: "#0e0e10",
		icons: [
			// {
			// 	src: "/icon-192x192.png",
			// 	sizes: "192x192",
			// 	type: "image/png",
			// },
			// {
			// 	src: "/icon-512x512.png",
			// 	sizes: "512x512",
			// 	type: "image/png",
			// },
		],
	};
}
