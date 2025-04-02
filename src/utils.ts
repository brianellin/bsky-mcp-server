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
 * Format a post for display in the response
 */
export function formatPost(item: any, index: number): string {
  // Handle both scenarios - when passed just a post or a full item with post and reason
  let post: any;
  let reason: any = null;
  
  // Check if this is an item with post property (feed item) or a direct post
  if (item && item.post) {
    post = item.post;
    reason = item.reason;
  } else {
    post = item;
    // For backwards compatibility, also check if the post itself has a reason
    if (post && post.reason) {
      reason = post.reason;
    }
  }
  
  // Check if this is a repost and extract repost information
  let isRepost = false;
  let reposter: any = null;
  
  if (reason && reason.$type === 'app.bsky.feed.defs#reasonRepost' && reason.by) {
    isRepost = true;
    reposter = reason.by;
  }
  
  // For reposts, the author is in post.author
  const author = post.author;
  
  // Safeguard against missing author
  if (!author) {
    return `Post #${index + 1}: Error - Could not determine author of post`;
  }
  
  // Extract and process thread/reply context
  let threadInfo: string[] = [];
  let isReply = false;
  
  // Check if post is a reply
  if (post.record?.reply || post.reply) {
    isReply = true;
    const replyInfo = post.record?.reply || post.reply;
    
    if (replyInfo) {
      threadInfo.push('🧵 Reply in thread:');
      
      // Add root post info if available
      if (replyInfo.root) {
        if (replyInfo.root.uri) {
          threadInfo.push(`  Root: ${replyInfo.root.uri}`);
        }
        
        if (replyInfo.root.author) {
          const rootAuthor = replyInfo.root.author;
          threadInfo.push(`  Root author: ${rootAuthor.displayName || rootAuthor.handle} (@${rootAuthor.handle})`);
        }
      }
      
      // Add parent post info if different from root
      if (replyInfo.parent && 
         (!replyInfo.root || replyInfo.parent.uri !== replyInfo.root.uri)) {
        if (replyInfo.parent.uri) {
          threadInfo.push(`  Replying to: ${replyInfo.parent.uri}`);
        }
        
        if (replyInfo.parent.author) {
          const parentAuthor = replyInfo.parent.author;
          threadInfo.push(`  Replying to: ${parentAuthor.displayName || parentAuthor.handle} (@${parentAuthor.handle})`);
        }
      }
    }
  }
  
  // Handle cases where the reply info is at the top level of the post object
  if (post.reply && !isReply) {
    isReply = true;
    threadInfo.push('🧵 Reply in thread:');
    
    // Add root info if available
    if (post.reply.root) {
      if (post.reply.root.uri) {
        threadInfo.push(`  Thread root: ${post.reply.root.uri}`);
      }
      const rootAuthor = post.reply.root.author;
      if (rootAuthor) {
        threadInfo.push(`  Thread started by: ${rootAuthor.displayName || rootAuthor.handle} (@${rootAuthor.handle})`);
        
        // Add root post content preview
        if (post.reply.root.record?.text) {
          const rootText = post.reply.root.record.text;
          threadInfo.push(`  Original post: ${rootText.length > 80 ? rootText.substring(0, 80) + '...' : rootText}`);
        }
      }
    }
    
    // Add parent info if available and different from root
    if (post.reply.parent && 
       (!post.reply.root || post.reply.parent.uri !== post.reply.root.uri)) {
      if (post.reply.parent.uri) {
        threadInfo.push(`  Replying to: ${post.reply.parent.uri}`);
      }
      const parentAuthor = post.reply.parent.author;
      if (parentAuthor) {
        threadInfo.push(`  Replying to: ${parentAuthor.displayName || parentAuthor.handle} (@${parentAuthor.handle})`);
        
        // Add parent post content preview
        if (post.reply.parent.record?.text) {
          const parentText = post.reply.parent.record.text;
          threadInfo.push(`  Parent post: ${parentText.length > 80 ? parentText.substring(0, 80) + '...' : parentText}`);
        }
      }
    }
  }
  
  // Extract post text and facets
  const postText = post.record?.text || post.text || '';
  const postFacets = post.record?.facets || post.facets || [];
  
  // Format the post content with improved layout
  let formattedPost = `Post #${index + 1}:`;
  
  // Add repost information if applicable
  if (isRepost && reposter) {
    formattedPost += `\n🔄 Reposted by: ${reposter.displayName || reposter.handle} (@${reposter.handle})`;
    if (reason.indexedAt) {
      formattedPost += ` at ${new Date(reason.indexedAt).toLocaleString()}`;
    }
  }
  
  // Add author information with richer details
  formattedPost += `\nAuthor: ${author.displayName || author.handle} (@${author.handle})`;
  
  // Add thread context if available
  if (isReply && threadInfo.length > 0) {
    formattedPost += `\nThread: ${isReply ? 'Reply' : 'Thread starter'}`;
    formattedPost += `\n${threadInfo.join('\n')}`;
  }
  
  // Add post content using facetsToMarkdown
  formattedPost += `\nContent: ${facetsToMarkdown(postText, postFacets)}`;
  
  // Add engagement metrics
  const engagementMetrics = [
    post.likeCount !== undefined ? `${post.likeCount} likes` : null,
    post.repostCount !== undefined ? `${post.repostCount} reposts` : null,
    post.replyCount !== undefined ? `${post.replyCount} replies` : null,
    post.quoteCount !== undefined ? `${post.quoteCount} quotes` : null
  ].filter(Boolean);
  
  if (engagementMetrics.length > 0) {
    formattedPost += `\nEngagement: ${engagementMetrics.join(', ')}`;
  }

  // Add embed information if present
  if (post.embed) {
    formattedPost += '\nEmbeds:';
    // Process embeds recursively to handle nested content
    function processEmbed(embed: any, depth: number = 0): void {
      if (!embed) return;
      
      const indent = '  '.repeat(depth);
      
      // Handle image embeds
      if (embed.$type === 'app.bsky.embed.images' && embed.images) {
        const imageCount = Array.isArray(embed.images) ? embed.images.length : 0;
        formattedPost += `\n${indent}🖼️ ${imageCount} image${imageCount !== 1 ? 's' : ''} attached`;
        
        // Add image details if available
        if (imageCount > 0 && Array.isArray(embed.images)) {
          embed.images.forEach((img: any, idx: number) => {
            const details: string[] = [];
            
            if (img.alt && img.alt.trim()) {
              details.push(`alt: "${img.alt}"`);
            }
            
            if (img.aspectRatio) {
              details.push(`aspect: ${img.aspectRatio.width}:${img.aspectRatio.height}`);
            }
            
            if (img.image?.mimeType) {
              details.push(`type: ${img.image.mimeType}`);
            }
            
            if (details.length > 0) {
              formattedPost += `\n${indent}  Image ${idx + 1}: ${details.join(', ')}`;
            }
          });
        }
      }
      
      // External link embeds (website cards)
      else if (embed.$type === 'app.bsky.embed.external' && embed.external) {
        const external = embed.external;
        formattedPost += `\n${indent}🔗 Website card:`;
        
        if (external.title) {
          formattedPost += `\n${indent}  Title: ${external.title}`;
        }
        
        if (external.description) {
          formattedPost += `\n${indent}  Description: ${external.description.substring(0, 100)}${external.description.length > 100 ? '...' : ''}`;
        }
        
        if (external.uri) {
          formattedPost += `\n${indent}  URL: ${external.uri}`;
        }
        
        if (external.thumb) {
          formattedPost += `\n${indent}  Thumbnail: ${external.thumb.mimeType || 'image'}`;
        }
      }
      
      // Record embeds (quote posts)
      else if (embed.$type === 'app.bsky.embed.record' && embed.record) {
        formattedPost += `\n${indent}💬 Quoted post:`;
        
        // Add URI of quoted post
        if (embed.record.uri) {
          formattedPost += `\n${indent}  URI: ${embed.record.uri}`;
        }
        
        // If the record is resolved and has data, show details
        if (embed.record.value || embed.record.author) {
          // Show the quoted author and text if available
          const quotedAuthor = embed.record.author || (embed.record.value?.author);
          const quotedText = embed.record.value?.text;
          const quotedRecord = embed.record.value || embed.record;
          
          if (quotedAuthor) {
            formattedPost += `\n${indent}  By: ${quotedAuthor.displayName || quotedAuthor.handle} (@${quotedAuthor.handle})`;
          }
          
          if (quotedText) {
            formattedPost += `\n${indent}  Content: ${quotedText}`;
          }
          
          // Handle stats if available
          if (embed.record.likeCount !== undefined || embed.record.repostCount !== undefined) {
            const stats = [
              embed.record.likeCount !== undefined ? `${embed.record.likeCount} likes` : null,
              embed.record.repostCount !== undefined ? `${embed.record.repostCount} reposts` : null,
              embed.record.replyCount !== undefined ? `${embed.record.replyCount} replies` : null
            ].filter(Boolean).join(', ');
            
            if (stats) {
              formattedPost += `\n${indent}  Stats: ${stats}`;
            }
          }
        }
      }
      
      // If embed has its own embeds array (nested embeds)
      if (embed.embeds && Array.isArray(embed.embeds)) {
        formattedPost += `\n${indent}Multiple embedded content items:`;
        embed.embeds.forEach((subEmbed: any, idx: number) => {
          formattedPost += `\n${indent}Item #${idx + 1}:`;
          processEmbed(subEmbed, depth + 1);
        });
      }
    }
    
    processEmbed(post.embed);
  }
  
  // Add post timestamp and URI
  formattedPost += `\nPosted: ${new Date(post.indexedAt).toLocaleString()}`;
  formattedPost += `\nURI: ${post.uri}`;
  formattedPost += `\n---`;

  return formattedPost;
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

