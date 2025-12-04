import React from 'react';
import icons from './iconsMap';
// Remove bulk import of all lucide icons; rely only on curated map.
// For rare missing icons add them to iconsMap.js to keep bundle lean.

// Unified icon resolver: first check curated map (tree-shaken), then fallback to dynamic lucide import.
// If still missing, render nothing to avoid distracting '?' placeholders.
function Icon({
    name,
    size = 24,
    color = 'currentColor',
    className = '',
    strokeWidth = 2,
    title,
    ...props
}) {
    if (!name) return null;

    const IconComponent = icons?.[name];

    if (!IconComponent) {
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            if (import.meta.env.DEV) console.warn(`[Icon] Iconul '${name}' lipsește din iconsMap.`);
        }
        return null;
    }

    return (
        <IconComponent
            size={size}
            color={color}
            strokeWidth={strokeWidth}
            className={className}
            aria-hidden={title ? undefined : true}
            {...props}
        />
    );
}

export default Icon;