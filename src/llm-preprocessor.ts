// Implements the spec described in /POST_FORMAT_SPEC.md
import { formatISO9075 } from 'date-fns';

// Types for Bluesky posts and feeds
interface Author {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

interface Embed {
  $type: string;
  [key: string]: any;
}

interface EmbedView {
  $type: string;
  external?: {
    uri: string;
    title: string;
    description: string;
    thumb?: string;
  };
  record?: {
    $type: string;
    uri: string;
    cid: string;
    author: Author;
    value: any;
    likeCount?: number;
    replyCount?: number;
    repostCount?: number;
    quoteCount?: number;
    embeds?: any[];
  };
  images?: Array<{
    thumb?: string;
    fullsize?: string;
    alt?: string;
  }>;
  media?: {
    [key: string]: any;
  };
}

interface PostRecord {
  $type: string;
  text: string;
  createdAt: string;
  langs?: string[];
  reply?: {
    parent: {
      cid: string;
      uri: string;
    };
    root: {
      cid: string;
      uri: string;
    };
  };
  embed?: Embed;
  facets?: Array<{
    $type: string;
    features: Array<{
      $type: string;
      did?: string;
    }>;
    index: {
      byteStart: number;
      byteEnd: number;
    };
  }>;
}

interface ThreadGate {
  uri: string;
  cid: string;
  record: {
    $type: string;
    allow: Array<{
      $type: string;
    }>;
    createdAt: string;
    post: string;
  };
  lists: any[];
}

interface Post {
  uri: string;
  cid: string;
  author: Author;
  record: PostRecord;
  embed?: EmbedView;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  indexedAt: string;
  viewer?: {
    threadMuted?: boolean;
    replyDisabled?: boolean;
    embeddingDisabled?: boolean;
  };
  labels: any[];
  threadgate?: ThreadGate;
}

interface ThreadReply {
  root: Post;
  parent: Post;
  grandparentAuthor?: Author;
}

interface FeedItem {
  post: Post;
  reply?: ThreadReply;
  reason?: {
    $type: string;
    by?: Author;
    indexedAt?: string;
  };
}

interface Feed {
  items: FeedItem[];
}

/**
 * Formats a date to a human-readable format
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatISO9075(date).replace('T', ', ');
  } catch (e) {
    return dateString;
  }
}

/**
 * Creates a Bluesky URL from a URI
 */
function createBskyUrl(uri: string, handle?: string): string {
  try {
    const parts = uri.split('/');
    const did = parts[2];
    const rkey = parts[parts.length - 1];
    return `https://bsky.app/profile/${handle || did}/post/${rkey}`;
  } catch (e) {
    return '';
  }
}

/**
 * Determines the post type based on its properties
 */
function determinePostType(post: Post, reason?: any): string[] {
  const types: string[] = [];
  
  // Base type
  if (post.record.reply) {
    types.push('reply');
  } else {
    types.push('standalone');
  }
  
  // Note: repost is no longer a post type since we're using a dedicated repost structure
  
  // Check if it has a quoted post
  if (post.embed && post.embed.$type === 'app.bsky.embed.record#view') {
    types.push('quote');
  }
  
  // Check for reply limitations
  if (post.threadgate || (post.viewer && post.viewer.replyDisabled)) {
    types.push('reply_limited');
  }
  
  return types;
}

/**
 * Format a single post according to the spec
 */
function formatPost(feedItem: FeedItem): string {
  const { post, reply, reason } = feedItem;
  
  // Handle repost specially
  if (reason && reason.$type === 'app.bsky.feed.defs#reasonRepost' && reason.by) {
    // Create a repost element with the reposter's info
    const formattedDate = formatDate(reason.indexedAt || '');
    let result = `  <repost author_name="${reason.by.displayName || ''}" author_handle="${reason.by.handle}" reposted_at="${formattedDate}">\n`;
    
    // Format the original post (without the repost type)
    const types = determinePostType(post);
    const bskyUrl = createBskyUrl(post.uri, post.author.handle);
    const postDate = formatDate(post.record.createdAt);
    
    // Add the post inside the repost
    result += `    <post type="${types.join(',')}" uri="${post.uri}" bsky_url="${bskyUrl}" author_name="${post.author.displayName || ''}" author_handle="${post.author.handle}" posted_at="${postDate}">\n`;
    result += `      <content>\n        ${post.record.text}\n      </content>\n`;
    
    // Add embeds
    result += formatEmbeds(post, '      ');
    
    // Add engagement metrics info (without Posted: prefix)
    result += `      \n      Engagement: ${post.likeCount} likes, ${post.repostCount} reposts, ${post.replyCount} replies${post.quoteCount ? ', ' + post.quoteCount + ' quotes' : ''}\n`;
    
    // Add thread settings for reposts if applicable
    if (post.threadgate) {
      const allowFollowers = post.threadgate.record.allow.some(a => a.$type === 'app.bsky.feed.threadgate#followerRule');
      const allowFollowing = post.threadgate.record.allow.some(a => a.$type === 'app.bsky.feed.threadgate#followingRule');
      if (allowFollowers && allowFollowing) {
        result += `      Thread settings: Replies limited to followers/following\n`;
      } else if (allowFollowers) {
        result += `      Thread settings: Replies limited to followers\n`;
      } else if (allowFollowing) {
        result += `      Thread settings: Replies limited to following\n`;
      }
    }
    
    // Close the post and repost tags
    result += `    </post>\n`;
    result += `  </repost>`;
    
    return result;
  }
  
  // For non-reposts, continue with normal formatting
  const types = determinePostType(post, reason);
  const bskyUrl = createBskyUrl(post.uri, post.author.handle);
  const postDate = formatDate(post.record.createdAt);
  
  // Start the post tag with all the attributes
  let result = `  <post type="${types.join(',')}" uri="${post.uri}" bsky_url="${bskyUrl}" author_name="${post.author.displayName || ''}" author_handle="${post.author.handle}" posted_at="${postDate}">\n`;
  
  // Add post content
  result += `    <content>\n      ${post.record.text}\n    </content>\n`;
  
  // Handle replies
  if (reply && types.includes('reply')) {
    const parentUrl = createBskyUrl(reply.parent.uri, reply.parent.author.handle);
    result += `    \n    <reply_to uri="${reply.parent.uri}" bsky_url="${parentUrl}" author_name="${reply.parent.author.displayName || ''}" author_handle="${reply.parent.author.handle}">\n`;
    result += `      <content>\n        ${reply.parent.record.text}\n      </content>\n`;
    result += `    </reply_to>\n`;
  }
  
  // Handle quote posts
  if (post.embed && post.embed.$type === 'app.bsky.embed.record#view' && post.embed.record) {
    const quotedUrl = createBskyUrl(post.embed.record.uri, post.embed.record.author.handle);
    const quotedPostDate = formatDate(post.embed.record.value.createdAt);
    result += `    \n    <quoted_post uri="${post.embed.record.uri}" bsky_url="${quotedUrl}" author_name="${post.embed.record.author.displayName || ''}" author_handle="${post.embed.record.author.handle}" posted_at="${quotedPostDate}">\n`;
    result += `      <content>\n        ${post.embed.record.value.text}\n      </content>\n`;
    result += `      \n      Engagement: ${post.embed.record.likeCount || 0} likes, ${post.embed.record.repostCount || 0} reposts, ${post.embed.record.replyCount || 0} replies\n`;
    result += `    </quoted_post>\n`;
  }
  
  // Add embeds
  result += formatEmbeds(post, '    ');
  
  // Add engagement metrics (without Posted: prefix)
  result += `    \n    Engagement: ${post.likeCount} likes, ${post.repostCount} reposts, ${post.replyCount} replies${post.quoteCount ? ', ' + post.quoteCount + ' quotes' : ''}\n`;
  
  // Close the post tag
  result += `  </post>`;
  
  return result;
}

/**
 * Format embeds for a post (extracted to a helper function)
 */
function formatEmbeds(post: Post, indentation: string = ''): string {
  let result = '';
  
  if (post.embed) {
    // Images
    if (post.embed.$type === 'app.bsky.embed.images#view' && post.embed.images) {
      post.embed.images.forEach((image) => {
        result += `${indentation}\n${indentation}<embed type="image">\n`;
        result += `${indentation}  Image description: "${image.alt || 'No description provided'}"\n`;
        result += `${indentation}  URL: ${image.fullsize || image.thumb || ''}\n`;
        result += `${indentation}</embed>\n`;
      });
    } 
    // External links
    else if (post.embed.$type === 'app.bsky.embed.external#view' && post.embed.external) {
      result += `${indentation}\n${indentation}<embed type="link">\n`;
      result += `${indentation}  Title: "${post.embed.external.title}"\n`;
      result += `${indentation}  URL: ${post.embed.external.uri}\n`;
      result += `${indentation}  Description: "${post.embed.external.description}"\n`;
      if (post.embed.external.thumb) {
        result += `${indentation}  Thumbnail: ${post.embed.external.thumb}\n`;
      }
      result += `${indentation}</embed>\n`;
    }
    // Videos
    else if (post.embed.$type.includes('video')) {
      result += `${indentation}\n${indentation}<embed type="video">\n`;
      if (post.embed.media && post.embed.media.thumbnail) {
        result += `${indentation}  Thumbnail: ${post.embed.media.thumbnail.url || ''}\n`;
      }
      if (post.embed.media && post.embed.media.video) {
        result += `${indentation}  Playlist: ${post.embed.media.video.url || ''}\n`;
      }
      result += `${indentation}</embed>\n`;
    }
  }
  
  return result;
}

/**
 * Format replies for a post
 */
function formatReplies(feedItems: FeedItem[], parentUri: string): string {
  // Find direct replies to this post
  const replies = feedItems.filter(item => 
    item.reply && item.reply.parent.uri === parentUri
  );
  
  if (replies.length === 0) {
    return '';
  }
  
  let result = `\n\n    <replies>\n`;
  
  for (const reply of replies) {
    // Format the reply
    const formattedReply = formatPost(reply);
    
    // Indent the reply content to maintain hierarchy
    const indentedReply = formattedReply
      .split('\n')
      .map(line => `      ${line}`)
      .join('\n');
    
    result += indentedReply;
    
    // Check for nested replies (recursive)
    const nestedReplies = formatReplies(feedItems, reply.post.uri);
    if (nestedReplies) {
      // Add indentation to nested replies
      const indentedNestedReplies = nestedReplies
        .split('\n')
        .map(line => `  ${line}`)
        .join('\n');
      
      // Insert before the closing post tag
      const lastPostTagIndex = indentedReply.lastIndexOf('</post>');
      result = result.substring(0, lastPostTagIndex) + indentedNestedReplies + result.substring(lastPostTagIndex);
    }
  }
  
  result += `\n    </replies>`;
  return result;
}

/**
 * Group feed items into threads
 */
function groupThreads(feedItems: FeedItem[]): { threads: Map<string, FeedItem[]>, standalone: FeedItem[] } {
  const threads = new Map<string, FeedItem[]>();
  const standalone: FeedItem[] = [];
  
  for (const item of feedItems) {
    if (item.reply) {
      // This is part of a thread
      const rootUri = item.reply.root.uri;
      if (!threads.has(rootUri)) {
        threads.set(rootUri, []);
      }
      threads.get(rootUri)?.push(item);
    } else {
      // This is a standalone post
      standalone.push(item);
    }
  }
  
  return { threads, standalone };
}

/**
 * Format a complete thread
 */
function formatThread(feedItems: FeedItem[], rootUri: string): string {
  // Find the root post
  const rootPost = feedItems.find(item => 
    item.post.uri === rootUri || 
    (item.reply && item.reply.root.uri === rootUri && item.reply.parent.uri === rootUri)
  );
  
  if (!rootPost) {
    return '';
  }
  
  // Format the root post
  let result = formatPost(rootPost);
  
  // Add replies
  const replies = formatReplies(feedItems, rootUri);
  if (replies) {
    // Insert before the closing post tag
    const lastPostTagIndex = result.lastIndexOf('</post>');
    // If the post is a repost, we need to insert the replies into the nested post
    if (result.includes('<repost') && result.includes('</post>')) {
      result = result.substring(0, lastPostTagIndex) + replies + result.substring(lastPostTagIndex);
    } else {
      result = result.substring(0, lastPostTagIndex) + replies + result.substring(lastPostTagIndex);
    }
  }
  
  return result;
}

/**
 * Preprocess multiple posts into the XML format defined in the spec
 */
export function preprocessPosts(feedItems: FeedItem[]): string {
  let result = '<posts>\n';
  
  // Group into threads and standalone posts
  const { threads, standalone } = groupThreads(feedItems);
  
  // Format threads
  threads.forEach((items, rootUri) => {
    result += formatThread(items, rootUri) + '\n\n';
  });
  
  // Format standalone posts
  standalone.forEach(item => {
    result += formatPost(item) + '\n\n';
  });
  
  // Remove trailing newlines and add closing tag
  result = result.trimEnd() + '\n</posts>';
  
  return result;
}

// For backward compatibility
export function preprocessPost(feedItem: FeedItem): string {
  return formatPost(feedItem);
}

// For backward compatibility
export function formatFeed(feed: Feed): string {
  return preprocessPosts(feed.items);
}


