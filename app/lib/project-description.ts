/** Preserve any text the visitor already entered. Reject overflow instead of truncating. */
export function mergeProjectDescription(
  existing: string,
  incoming: string,
  limit = 5000,
): string | null {
  const addition = incoming.trim();
  if (!addition || addition.length > limit) return null;
  if (existing.trim() === addition || existing.endsWith(`\n\n${addition}`))
    return existing;
  const result = existing.trim() ? `${existing}\n\n${addition}` : addition;
  return result.length <= limit ? result : null;
}
