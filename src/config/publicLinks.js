// Centralized public links used in the app
// Set VITE_FREE_RESOURCES_DRIVE_URL in your environment for production
// Fallback defaults to your shared Google Drive folder for free resources

export const FREE_RESOURCES_DRIVE_URL =
	import.meta.env?.VITE_FREE_RESOURCES_DRIVE_URL ||
	"https://drive.google.com/drive/folders/1gnWkQk41j6-93AFifcXJC53omb11U7Tm?usp=sharing";

// Central demo video URL used for all "Vezi Demo" buttons
export const DEMO_VIDEO_URL =
    import.meta.env?.VITE_DEMO_VIDEO_URL ||
    "https://www.youtube.com/watch?v=es1a5wk4soo&list=RDes1a5wk4soo&start_radio=1";

// Header logo URL (prefer local file; can override via env for a remote logo)
export const LOGO_URL =
	import.meta.env?.VITE_LOGO_URL ||
	"/assets/images/logo.png";
