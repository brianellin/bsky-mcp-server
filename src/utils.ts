import { AtpAgent } from "@atproto/api";
import { RichText } from '@atproto/api'



/**
 * Represents a text content item in an MCP response.
 * This is the most basic type of content that can be returned.
 */
export interface TextContent {
  type: "text";
  text: string;
  [key: string]: unknown;
}

/**
 * Represents an image content item in an MCP response.
 * Contains the image data as a base64 string and its MIME type.
 */
export interface ImageContent {
  type: "image";
  data: string;
  mimeType: string;
  [key: string]: unknown;
}

/**
 * Represents a resource content item in an MCP response.
 * Can contain either a text-based resource with URI or a blob-based resource.
 * Used for linking to external content or providing structured data.
 */
export interface ResourceContent {
  type: "resource";
  resource: {
    text: string;
    uri: string;
    mimeType?: string;
    [key: string]: unknown;
  } | {
    uri: string;
    blob: string;
    mimeType?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Union type representing all possible content types that can be included in an MCP response.
 * Can be a text content, image content, or resource content.
 */
export type McpResponseContent = Array<TextContent | ImageContent | ResourceContent>;

/**
 * Represents a successful response from the MCP server.
 * Contains an array of content items that can be of any supported type.
 */
export interface McpSuccessResponse {
  content: McpResponseContent;
  [key: string]: unknown;
}

/**
 * Represents an error response from the MCP server.
 * Contains an error flag and an array of content items explaining the error.
 */
export interface McpErrorResponse {
  isError: true;
  content: McpResponseContent;
  [key: string]: unknown;
}




/**
 * Helper function to get a human-readable name for built-in feeds
 */
export function getFeedNameFromId(id: string): string {
  const knownFeeds: Record<string, string> = {
    'home': 'Home Timeline',
    'following': 'Following',
    'what-hot': 'What\'s Hot',
    'discover': 'Discover',
    'for-you': 'For You'
  };
  
  return knownFeeds[id] || id;
}

/**
 * Cleans a handle or DID string
 * @param input A string that could be a DID or handle (potentially with @ prefix)
 * @returns The cleaned handle with @ removed or the original DID
 */
export function cleanHandle(input: string): string {
  if (!input) return '';
  
  // If it's a DID, return it as is
  if (input.startsWith('did:')) {
    return input;
  }
  
  // If it has a leading @, remove it
  if (input.startsWith('@')) {
    return input.substring(1);
  }
  
  // Otherwise return as is
  return input;
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
 * Format the summary text for the response
 */
export function formatSummaryText(postsCount: number, entityType: string = 'feed'): string {
  return `Retrieved ${postsCount} posts from the ${entityType}.`;
}


/**
 * Validate a feed or list URI by fetching its information
 * @param agent The ATP agent instance
 * @param uri The feed or list URI to validate
 * @param type The type of URI ('feed' or 'list')
 * @returns The feed/list information or null if invalid
 */
export async function validateUri(
  agent: AtpAgent, 
  uri: string, 
  type: 'feed' | 'list'
): Promise<any | null> {
  try {
    let response;
    
    if (type === 'list' || uri.includes('app.bsky.graph.list')) {
      response = await agent.app.bsky.graph.getList({ list: uri });
    } else {
      response = await agent.app.bsky.feed.getFeedGenerator({ feed: uri });
    }
    
    if (!response.success) {
      return null;
    }
    
    return response.data;
  } catch (error) {
    return null;
  }
}

/**
 * Debugs the structure of a post to see where facets are stored
 * This is a temporary function to help with development
 */
export function debugPostStructure(post: any): void {
  console.error('DEBUG POST STRUCTURE:');
  console.error('Post has record:', !!post.record);
  
  if (post.record) {
    console.error('Record properties:', Object.keys(post.record));
    console.error('Has facets:', !!post.record.facets);
    
    if (post.record.facets) {
      console.error('First facet:', JSON.stringify(post.record.facets[0], null, 2));
    }
  }
  
  // Check if facets might be at another location
  console.error('Post properties:', Object.keys(post));
  console.error('Has facets at root:', !!post.facets);
  
  if (post.facets) {
    console.error('First facet at root:', JSON.stringify(post.facets[0], null, 2));
  }
}

