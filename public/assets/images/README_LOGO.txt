Place your brand logo images here:

- logo.png       -> used in the site header (recommended square, >= 128x128)
- logo-192.png   -> PWA icon 192x192
- logo-512.png   -> PWA icon 512x512

How to add:
1) Save the provided logo (the second image you shared) as logo.png in this folder.
	 - Alternatively, set an external URL via VITE_LOGO_URL in your .env (e.g., a CDN image);
		 the header will use that directly.
2) (Optional but recommended) Export 192x192 and 512x512 PNGs and save as logo-192.png and logo-512.png.
3) Rebuild the project and hard refresh the site (Ctrl+F5) to see the updates.

Env:
- VITE_LOGO_URL=https://your.cdn.com/path/to/logo.png  # optional override for header logo

Notes:
- If the files are missing, the header falls back to the current gradient star icon, and the PWA uses existing placeholders.
- Keep filenames exactly as above to match the code and manifest configuration.
