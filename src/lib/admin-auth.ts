/**
 * Lightweight, client-side gate for the /admin listing & bookings console.
 *
 * Xenios has no backend/database — every page in this app reads and writes
 * localStorage directly. This access code is therefore a deterrent against
 * casual/accidental access to listing & pricing controls, not a real
 * security boundary (anyone with browser devtools can read it). Set
 * NEXT_PUBLIC_ADMIN_ACCESS_CODE in the deployment environment to change it
 * from the default.
 */
export const ADMIN_ACCESS_CODE = process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE || 'XENIOS-ADMIN-2026';
