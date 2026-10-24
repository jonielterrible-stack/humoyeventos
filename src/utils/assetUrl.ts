/**
 * Universal Asset URL Resolver
 * Resolves static asset paths seamlessly across:
 * - Local AI Studio Dev Server (http://localhost:3000/)
 * - Vercel deployments (https://...vercel.app/)
 * - GitHub Pages subpath deployments (https://<user>.github.io/humoyeventos/)
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
