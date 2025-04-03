/**
 * Global list of keys that should always be removed from BlueSky JSON
 */
export const GLOBAL_KEYS_TO_REMOVE = [
  "cid"
];

/**
 * Recursively removes specified keys from a JSON structure
 * @param data The JSON structure to clean
 * @param keysToRemove Array of additional keys to remove from the structure
 * @returns The cleaned JSON structure with specified keys removed
 */
export function cleanBskyJson<T>(data: T, keysToRemove: string[] = []): T {
  // Combine global keys with passed in keys
  const allKeysToRemove = [...GLOBAL_KEYS_TO_REMOVE, ...keysToRemove];

  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => cleanBskyJson(item, keysToRemove)) as unknown as T;
  }

  const result = { ...data };
  
  for (const key in result) {
    if (allKeysToRemove.includes(key)) {
      delete result[key];
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = cleanBskyJson(result[key], keysToRemove);
    }
  }

  return result;
}
