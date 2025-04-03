// implememts the spec desciebed at /POST_FORMAT_SPEC.md
// use the exmaples as in /test/example_posts as reference 

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
 * Extracts the short ID from a Bluesky URI
 */
function getShortId(uri: string): string {
  return uri.split('/').pop() || uri;
}

/**
 * Determines the post type based on its properties
 */
function determinePostType(post: Post, reason?: any): string[] {
  const types: string[] = [];
  
  // Check if it's a thread root or standalone
  if (post.record.reply) {
    types.push('reply');
  } else if (post.replyCount > 0) {
    types.push('thread_root');
  } else {
    types.push('standalone');
  }
  
  // Check if it's a repost
  if (reason && reason.$type === 'app.bsky.feed.defs#reasonRepost') {
    types.push('repost');
  }
  
  // Check if it has a quoted post
  if (post.embed && post.embed.$type === 'app.bsky.embed.record#view') {
    types.push('quote');
  }
  
  // Check for media types
  if (post.embed) {
    if (post.embed.$type === 'app.bsky.embed.images#view') {
      types.push('image');
    } else if (post.embed.$type === 'app.bsky.embed.external#view') {
      types.push('link');
    } else if (post.embed.$type === 'app.bsky.embed.recordWithMedia#view' && 
               post.embed.media && 
               post.embed.media.$type === 'app.bsky.embed.images#view') {
      types.push('image');
    } else if (post.embed.$type.includes('video')) {
      types.push('video');
    }
  }
  
  // Check for mentions
  if (post.record.facets && post.record.facets.some(f => 
      f.features.some(feat => feat.$type === 'app.bsky.richtext.facet#mention'))) {
    types.push('mention');
  }
  
  // Check for reply limitations
  if (post.threadgate || (post.viewer && post.viewer.replyDisabled)) {
    types.push('reply_limited');
  }
  
  return types;
}

/**
 * Formats the date string to a more human-readable format
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatISO9075(date, { representation: 'date' }).replace('T', ', ');
  } catch (e) {
    return dateString;
  }
}

/**
 * Formats a single post according to the LLM-friendly format
 */
export function formatPost(postItem: FeedItem, id: string): string {
  const { post, reply, reason } = postItem;
  const types = determinePostType(post, reason);
  let result = `<post id="${id}" type="${types.join(',')}">\n`;
  
  // If it's a repost, add repost info
  if (reason && reason.$type === 'app.bsky.feed.defs#reasonRepost') {
    result += `  <repost_info>\n`;
    result += `    Reposted by: ${reason.by?.displayName || ''} (@${reason.by?.handle || ''})\n`;
    result += `    Reposted at: ${formatDate(reason.indexedAt || '')}\n`;
    result += `  </repost_info>\n\n`;
    
    result += `  <original_post>\n`;
    result += `    Post: ${post.record.text}\n`;
    result += `    Author: ${post.author.displayName || ''} (@${post.author.handle})\n`;
    result += `    Posted: ${formatDate(post.record.createdAt)} | Engagement: ${post.likeCount} likes, ${post.repostCount} reposts, ${post.replyCount} replies\n`;
    
    if (post.threadgate) {
      const allowFollowers = post.threadgate.record.allow.some(a => a.$type === 'app.bsky.feed.threadgate#followerRule');
      const allowFollowing = post.threadgate.record.allow.some(a => a.$type === 'app.bsky.feed.threadgate#followingRule');
      if (allowFollowers && allowFollowing) {
        result += `    Thread settings: Replies limited to followers/following\n`;
      } else if (allowFollowers) {
        result += `    Thread settings: Replies limited to followers\n`;
      } else if (allowFollowing) {
        result += `    Thread settings: Replies limited to following\n`;
      }
    }
    
    result += `  </original_post>\n`;
    return result + `</post>`;
  }
  
  // Regular post content
  result += `  Post: ${post.record.text}\n`;
  result += `  Author: ${post.author.displayName || ''} (@${post.author.handle})\n`;
  
  // Handle reply to information
  if (reply && post.record.reply) {
    result += `\n  <reply_to id="${id.split('.')[0] + '.1'}">\n`;
    result += `    Original Post: ${reply.parent.record.text.substring(0, 100)}${reply.parent.record.text.length > 100 ? '...' : ''}\n`;
    result += `    Author: ${reply.parent.author.displayName || ''} (@${reply.parent.author.handle})\n`;
    result += `  </reply_to>\n`;
  }
  
  // Handle quote post
  if (post.embed && post.embed.$type === 'app.bsky.embed.record#view' && post.embed.record) {
    result += `\n  <quoted_post id="${id}.quoted">\n`;
    result += `    Post: ${post.embed.record.value.text}\n`;
    result += `    Author: ${post.embed.record.author.displayName || ''} (@${post.embed.record.author.handle})\n`;
    result += `    Posted: ${formatDate(post.embed.record.value.createdAt)} | Engagement: ${post.embed.record.likeCount || 0} likes, ${post.embed.record.repostCount || 0} reposts, ${post.embed.record.replyCount || 0} replies\n`;
    result += `  </quoted_post>\n`;
  }
  
  // Handle media content
  if (post.embed) {
    // Images
    if (post.embed.$type === 'app.bsky.embed.images#view' && post.embed.images) {
      post.embed.images.forEach((image, idx) => {
        result += `\n  <media type="image">\n`;
        result += `    Image: "${image.alt || 'No description provided'}"\n`;
        result += `    URL: ${image.fullsize || image.thumb || ''}\n`;
        result += `  </media>\n`;
      });
    } 
    // External links
    else if (post.embed.$type === 'app.bsky.embed.external#view' && post.embed.external) {
      result += `\n  <media type="link">\n`;
      result += `    Title: "${post.embed.external.title}"\n`;
      result += `    URL: ${post.embed.external.uri}\n`;
      result += `    Description: "${post.embed.external.description}"\n`;
      if (post.embed.external.thumb) {
        result += `    Thumbnail: ${post.embed.external.thumb}\n`;
      }
      result += `  </media>\n`;
    }
    // Videos
    else if (post.embed.$type.includes('video')) {
      result += `\n  <media type="video">\n`;
      if (post.embed.media && post.embed.media.thumbnail) {
        result += `    Thumbnail: ${post.embed.media.thumbnail.url || ''}\n`;
      }
      if (post.embed.media && post.embed.media.video) {
        result += `    Playlist: ${post.embed.media.video.url || ''}\n`;
      }
      result += `  </media>\n`;
    }
  }
  
  // Add mentions if present
  if (types.includes('mention') && post.record.facets) {
    const mentions = post.record.facets
      .filter(f => f.features.some(feat => feat.$type === 'app.bsky.richtext.facet#mention'))
      .map(f => {
        const mention = f.features.find(feat => feat.$type === 'app.bsky.richtext.facet#mention');
        // Extract the handle from the text using the byte indices
        const text = post.record.text;
        const startIdx = f.index.byteStart;
        const endIdx = f.index.byteEnd;
        try {
          const handle = text.substring(startIdx, endIdx);
          return handle;
        } catch (e) {
          return mention ? mention.did : '';
        }
      });
    
    if (mentions.length > 0) {
      result += `\n  <mentions>\n`;
      mentions.forEach(mention => {
        result += `    <user>${mention}</user>\n`;
      });
      result += `  </mentions>\n`;
    }
  }
  
  // Add engagement and posting info
  result += `\n  Posted: ${formatDate(post.record.createdAt)} | Engagement: ${post.likeCount} likes, ${post.repostCount} reposts, ${post.replyCount} replies${post.quoteCount ? ', ' + post.quoteCount + ' quotes' : ''}\n`;
  
  return result + `</post>`;
}

/**
 * Creates a reference map for all posts in the feed
 */
function createReferenceMap(feed: Feed): { refMap: string, idMapping: Map<string, { id: string, uri: string, short_id: string }> } {
  const refMap = new Map<string, { id: string, uri: string, short_id: string }>();
  let id = 1;
  
  // Process each post
  feed.items.forEach((item, idx) => {
    const { post, reply } = item;
    
    // Add the main post
    const postId = String(id);
    refMap.set(post.uri, { 
      id: postId,
      uri: post.uri,
      short_id: getShortId(post.uri)
    });
    
    // If this is part of a thread, add the thread components with sub-ids
    if (reply) {
      // Add root post
      if (reply.root && !refMap.has(reply.root.uri)) {
        refMap.set(reply.root.uri, { 
          id: `${postId}.1`,
          uri: reply.root.uri,
          short_id: getShortId(reply.root.uri)
        });
      }
      
      // Add parent post
      if (reply.parent && !refMap.has(reply.parent.uri)) {
        refMap.set(reply.parent.uri, { 
          id: `${postId}.2`,
          uri: reply.parent.uri,
          short_id: getShortId(reply.parent.uri)
        });
      }
    }
    
    // Add quoted post if present
    if (post.embed && post.embed.$type === 'app.bsky.embed.record#view' && post.embed.record) {
      refMap.set(post.embed.record.uri, { 
        id: `${postId}.quoted`,
        uri: post.embed.record.uri,
        short_id: getShortId(post.embed.record.uri)
      });
    }
    
    id++;
  });
  
  // Generate the XML for the reference map
  let result = `  <reference_map>\n`;
  refMap.forEach(ref => {
    result += `    <ref id="${ref.id}" uri="${ref.uri}" short_id="${ref.short_id}" />\n`;
  });
  result += `  </reference_map>\n`;
  
  return { refMap: result, idMapping: refMap };
}

/**
 * Formats a thread of posts
 */
function formatThread(posts: FeedItem[], threadId: string, idMapping: Map<string, { id: string, uri: string, short_id: string }>): string {
  let result = `  <thread id="${threadId}">\n`;
  
  // Sort posts to ensure the root is first, then replies in order
  posts.sort((a, b) => {
    // Root post should come first
    if (a.reply && b.reply && a.reply.root.uri === a.post.uri) return -1;
    if (a.reply && b.reply && b.reply.root.uri === b.post.uri) return 1;
    
    // Sort by creation date otherwise
    return new Date(a.post.record.createdAt).getTime() - new Date(b.post.record.createdAt).getTime();
  });
  
  // Start with the thread root
  const rootPost = posts.find(p => !p.reply || p.reply.root.uri === p.post.uri);
  if (rootPost) {
    const rootPostId = idMapping.get(rootPost.post.uri)?.id || threadId + '.1';
    result += formatPostWithReplies(rootPost, rootPostId, posts, idMapping);
  }
  
  result += `  </thread>\n`;
  return result;
}

/**
 * Formats a post with its replies recursively
 */
function formatPostWithReplies(
  postItem: FeedItem, 
  postId: string, 
  allPosts: FeedItem[], 
  idMapping: Map<string, { id: string, uri: string, short_id: string }>
): string {
  // Format the post itself
  let result = formatPost(postItem, postId);
  
  // Find direct replies to this post
  const replies = allPosts.filter(p => 
    p.reply && p.reply.parent && p.reply.parent.uri === postItem.post.uri
  );
  
  if (replies.length > 0) {
    // Insert replies section before the closing tag
    const closingTagIndex = result.lastIndexOf('</post>');
    const postContentPart = result.substring(0, closingTagIndex);
    const closingTagPart = result.substring(closingTagIndex);
    
    result = postContentPart + '\n\n  <replies>\n';
    
    // Add each reply
    replies.forEach(reply => {
      const replyId = idMapping.get(reply.post.uri)?.id || postId + '.reply';
      result += formatPostWithReplies(reply, replyId, allPosts, idMapping);
    });
    
    result += '  </replies>\n' + closingTagPart;
  }
  
  return result;
}

/**
 * Formats a complete feed of posts
 */
export function formatFeed(feed: Feed): string {
  let result = '<feed>\n';
  
  // Create reference map
  const { refMap, idMapping } = createReferenceMap(feed);
  result += refMap;
  
  // Group posts by thread
  const threads = new Map<string, FeedItem[]>();
  const standalonePosts: FeedItem[] = [];
  
  feed.items.forEach(item => {
    if (item.reply) {
      // This is part of a thread
      const rootUri = item.reply.root.uri;
      if (!threads.has(rootUri)) {
        threads.set(rootUri, []);
      }
      threads.get(rootUri)?.push(item);
    } else {
      // This is a standalone post
      standalonePosts.push(item);
    }
  });
  
  // Format each thread
  let threadCounter = 1;
  threads.forEach((posts, rootUri) => {
    result += formatThread(posts, String(threadCounter), idMapping);
    threadCounter++;
  });
  
  // Format standalone posts
  standalonePosts.forEach(post => {
    const postId = idMapping.get(post.post.uri)?.id || String(threadCounter++);
    result += `  ${formatPost(post, postId)}\n`;
  });
  
  result += '</feed>';
  return result;
}


