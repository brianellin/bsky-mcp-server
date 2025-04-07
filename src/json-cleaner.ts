import { RichText } from '@atproto/api';
import * as yaml from 'js-yaml';

/**
 * Global list of keys that should always be removed from BlueSky JSON
 */
export const GLOBAL_KEYS_TO_REMOVE = [
  "cid","ref", "associated"
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
  
  // First, process text with facets if both exist in the same object
  if ('facets' in result && 'text' in result && result.facets && result.text) {
    // Convert text with facets to markdown
    result.text = facetsToMarkdown(result.text as string, result.facets as any[]);
    // Remove facets since they're now applied to the text
    delete result.facets;
  }
  
  // If this object has a post field, add a post-link field with the permalink
  if ('post' in result && result.post && typeof result.post === 'object') {
    const post = result.post as Record<string, any>;
    // Try to create a permalink based on post URI if it exists
    if ('uri' in post && typeof post.uri === 'string') {
      // Extract the components from the URI (at://did:plc:abcdef/app.bsky.feed.post/123)
      try {
        const uri = post.uri;
        const parts = uri.split('/');
        if (parts.length >= 4) {
          const did = parts[2];
          const rkey = parts[parts.length - 1];
          // Create the permalink
          (result as Record<string, any>)['post-link'] = `https://bsky.app/profile/${did}/post/${rkey}`;
        }
      } catch (error) {
        // If anything goes wrong, just don't add the link
        console.error("Error creating post link:", error);
      }
    }
  }
  
  for (const key in result) {
    if (allKeysToRemove.includes(key)) {
      delete result[key];
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = cleanBskyJson(result[key], keysToRemove);
    }
  }

  return result;
}

/**
 * Convert Bluesky post text + facets into Markdown
 * @param text The post text content
 * @param facets Optional array of facets from the post
 * @returns Markdown formatted text with proper links and mentions
 */
export function facetsToMarkdown(text: string, facets?: any[]): string {
    if (!text) return '';
    
    // Initialize RichText with the text and facets
    const rt = new RichText({ text, facets: facets ?? [] });
    
    // Transform segments into Markdown
    let markdown = '';
    for (const segment of rt.segments()) {
      if (segment.isLink()) {
        //markdown += `[${segment.text}](${segment.link?.uri})`;
        markdown += `<${segment.link?.uri}>`; // use the markdown auto-link syntax for simplicity for the LLM instead of linking the text fragment
      } else if (segment.isMention()) {
        markdown += `[${segment.text}](https://bsky.app/profile/${segment.mention?.did})`;
      } else if (segment.isTag()) {
        markdown += `#${segment.tag?.tag}`;
      } else {
        markdown += segment.text;
      }
    }
    
    return markdown;
  }

/**
 * Convert any JavaScript object to YAML string representation
 * 
 * @param data The data object to convert to YAML
 * @param options Optional YAML dump options
 * @returns A string containing the YAML representation of the data
 */
export function jsonToYaml(data: any, options: yaml.DumpOptions = {}): string {
  // Default options for better readability
  const defaultOptions: yaml.DumpOptions = {
    indent: 2,
    lineWidth: 100,
    noRefs: true, // Don't use YAML references
    noCompatMode: true, // Use modern YAML features
    sortKeys: true // Consistently sort keys for better diffs
  };

  // Merge default options with any user-provided options
  const mergedOptions = { ...defaultOptions, ...options };

  try {
    return yaml.dump(data, mergedOptions);
  } catch (error) {
    console.error("Error converting to YAML:", error);
    return `Error converting to YAML: ${error instanceof Error ? error.message : String(error)}`;
  }
}

  
