// Implements the spec described in /POST_FORMAT_SPEC.md
import { formatISO9075 } from 'date-fns';
import type { 
  AppBskyFeedDefs,
  AppBskyEmbedImages,
  AppBskyEmbedVideo,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
  AppBskyActorDefs,
  AppBskyFeedPost
} from '@atproto/api';

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
function determinePostType(post: AppBskyFeedDefs.PostView, reason?: AppBskyFeedDefs.ReasonRepost): string[] {
  const types: string[] = [];
  
  // Base type
  const record = post.record as AppBskyFeedPost.Record;
  if (record.reply) {
    types.push('reply');
  } else {
    types.push('standalone');
  }
  
  // Note: repost is no longer a post type since we're using a dedicated repost structure
  
  // Check if it has a quoted post
  if (post.embed && post.embed.$type === 'app.bsky.embed.record#view') {
    types.push('quote');
  }
  
  // We're no longer tracking reply limitations
  
  return types;
}

/**
 * Format a single post according to the spec
 */
function formatPost(feedItem: AppBskyFeedDefs.FeedViewPost): string {
  const { post, reply, reason } = feedItem;
  
  // Handle repost specially
  if (reason && reason.$type === 'app.bsky.feed.defs#reasonRepost') {
    // Create a repost element with the reposter's info
    const reasonRepost = reason as AppBskyFeedDefs.ReasonRepost;
    const formattedDate = formatDate(reasonRepost.indexedAt || '');
    let result = `  <repost author_name="${reasonRepost.by.displayName || ''}" author_handle="${reasonRepost.by.handle}" reposted_at="${formattedDate}">\n`;
    
    // Format the original post (without the repost type)
    const types = determinePostType(post);
    const bskyUrl = createBskyUrl(post.uri, post.author.handle);
    const record = post.record as AppBskyFeedPost.Record;
    const postDate = formatDate(record.createdAt);
    
    // Add the post inside the repost
    result += `    <post type="${types.join(',')}" uri="${post.uri}" bsky_url="${bskyUrl}" author_name="${post.author.displayName || ''}" author_handle="${post.author.handle}" posted_at="${postDate}">\n`;
    result += `      <content>\n        ${record.text}\n      </content>\n`;
    
    // Add embeds
    result += formatEmbeds(post, '      ');
    
    // Add engagement metrics info (without Posted: prefix)
    result += `      \n      Engagement: ${post.likeCount} likes, ${post.repostCount} reposts, ${post.replyCount} replies${post.quoteCount ? ', ' + post.quoteCount + ' quotes' : ''}\n`;
    
    // No longer tracking thread settings
    
    // Close the post and repost tags
    result += `    </post>\n`;
    result += `  </repost>`;
    
    return result;
  }
  
  // For non-reposts, continue with normal formatting
  const types = determinePostType(post, reason as AppBskyFeedDefs.ReasonRepost);
  const bskyUrl = createBskyUrl(post.uri, post.author.handle);
  const record = post.record as AppBskyFeedPost.Record;
  const postDate = formatDate(record.createdAt);
  
  // Start the post tag with all the attributes
  let result = `  <post type="${types.join(',')}" uri="${post.uri}" bsky_url="${bskyUrl}" author_name="${post.author.displayName || ''}" author_handle="${post.author.handle}" posted_at="${postDate}">\n`;
  
  // Add post content
  result += `    <content>\n      ${record.text}\n    </content>\n`;
  
  // Handle replies
  if (reply && types.includes('reply')) {
    const parentUrl = createBskyUrl(reply.parent.$type === 'app.bsky.feed.defs#postView' ? 
      (reply.parent as AppBskyFeedDefs.PostView).uri : '', 
      reply.parent.$type === 'app.bsky.feed.defs#postView' ? 
      (reply.parent as AppBskyFeedDefs.PostView).author.handle : '');
      
    const parentRecord = reply.parent.$type === 'app.bsky.feed.defs#postView' ? 
      (reply.parent as AppBskyFeedDefs.PostView).record as AppBskyFeedPost.Record : null;
    
    if (parentRecord) {
      result += `    \n    <reply_to uri="${(reply.parent as AppBskyFeedDefs.PostView).uri}" bsky_url="${parentUrl}" author_name="${(reply.parent as AppBskyFeedDefs.PostView).author.displayName || ''}" author_handle="${(reply.parent as AppBskyFeedDefs.PostView).author.handle}">\n`;
      result += `      <content>\n        ${parentRecord.text}\n      </content>\n`;
      result += `    </reply_to>\n`;
    }
  }
  
  // Handle quote posts
  if (post.embed && post.embed.$type === 'app.bsky.embed.record#view') {
    const embedRecord = post.embed as AppBskyEmbedRecord.View;
    if (embedRecord.record && embedRecord.record.$type === 'app.bsky.embed.record#viewRecord') {
      const recordView = embedRecord.record as AppBskyEmbedRecord.ViewRecord;
      const quotedUrl = createBskyUrl(recordView.uri, recordView.author.handle);
      const quotedRecord = recordView.value as { text: string; createdAt: string };
      const quotedPostDate = formatDate(quotedRecord.createdAt);
      result += `    \n    <quoted_post uri="${recordView.uri}" bsky_url="${quotedUrl}" author_name="${recordView.author.displayName || ''}" author_handle="${recordView.author.handle}" posted_at="${quotedPostDate}">\n`;
      result += `      <content>\n        ${quotedRecord.text}\n      </content>\n`;
      result += `      \n      Engagement: ${recordView.likeCount || 0} likes, ${recordView.repostCount || 0} reposts, ${recordView.replyCount || 0} replies\n`;
      result += `    </quoted_post>\n`;
    }
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
function formatEmbeds(post: AppBskyFeedDefs.PostView, indentation: string = ''): string {
  let result = '';
  
  if (post.embed) {
    // Images
    if (post.embed.$type === 'app.bsky.embed.images#view') {
      const imagesEmbed = post.embed as AppBskyEmbedImages.View;
      if (imagesEmbed.images) {
        imagesEmbed.images.forEach((image) => {
          result += `${indentation}\n${indentation}<embed type="image">\n`;
          result += `${indentation}  Image description: "${image.alt || 'No description provided'}"\n`;
          result += `${indentation}  Image URL: ${image.fullsize || image.thumb || ''}\n`;
          result += `${indentation}</embed>\n`;
        });
      }
    } 
    // External links
    else if (post.embed.$type === 'app.bsky.embed.external#view') {
      const externalEmbed = post.embed as AppBskyEmbedExternal.View;
      if (externalEmbed.external) {
        result += `${indentation}\n${indentation}<embed type="link">\n`;
        result += `${indentation}  Title: "${externalEmbed.external.title}"\n`;
        result += `${indentation}  URL: ${externalEmbed.external.uri}\n`;
        result += `${indentation}  Description: "${externalEmbed.external.description}"\n`;
        result += `${indentation}</embed>\n`;
      }
    }
    // Videos
    else if (post.embed.$type.includes('video')) {
      const videoEmbed = post.embed as AppBskyEmbedVideo.View;
      result += `${indentation}\n${indentation}<embed type="video">\n`;
      if (videoEmbed.thumbnail) {
        result += `${indentation}  Thumbnail: ${videoEmbed.thumbnail || ''}\n`;
      }
      if (videoEmbed.playlist) {
        result += `${indentation}  Playlist: ${videoEmbed.playlist || ''}\n`;
      }
      result += `${indentation}</embed>\n`;
    }
  }
  
  return result;
}

/**
 * Format replies for a post
 */
function formatReplies(feedItems: AppBskyFeedDefs.FeedViewPost[], parentUri: string): string {
  // Find direct replies to this post
  const replies = feedItems.filter(item => 
    item.reply && 
    item.reply.parent.$type === 'app.bsky.feed.defs#postView' &&
    (item.reply.parent as AppBskyFeedDefs.PostView).uri === parentUri
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
function groupThreads(feedItems: AppBskyFeedDefs.FeedViewPost[]): { 
  threads: Map<string, AppBskyFeedDefs.FeedViewPost[]>, 
  standalone: AppBskyFeedDefs.FeedViewPost[] 
} {
  const threads = new Map<string, AppBskyFeedDefs.FeedViewPost[]>();
  const standalone: AppBskyFeedDefs.FeedViewPost[] = [];
  
  for (const item of feedItems) {
    if (item.reply) {
      // This is part of a thread
      const rootUri = item.reply.root.$type === 'app.bsky.feed.defs#postView' ? 
        (item.reply.root as AppBskyFeedDefs.PostView).uri : '';
      
      if (rootUri && !threads.has(rootUri)) {
        threads.set(rootUri, []);
      }
      
      if (rootUri) {
        threads.get(rootUri)?.push(item);
      }
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
function formatThread(feedItems: AppBskyFeedDefs.FeedViewPost[], rootUri: string): string {
  // Find the root post
  const rootPost = feedItems.find(item => 
    item.post.uri === rootUri || 
    (item.reply && 
     item.reply.root.$type === 'app.bsky.feed.defs#postView' &&
     (item.reply.root as AppBskyFeedDefs.PostView).uri === rootUri && 
     item.reply.parent.$type === 'app.bsky.feed.defs#postView' &&
     (item.reply.parent as AppBskyFeedDefs.PostView).uri === rootUri)
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
export function preprocessPosts(feedItems: AppBskyFeedDefs.FeedViewPost[]): string {
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
export function preprocessPost(feedItem: AppBskyFeedDefs.FeedViewPost): string {
  return formatPost(feedItem);
}

// For backward compatibility
export function formatFeed(feed: { items: AppBskyFeedDefs.FeedViewPost[] }): string {
  return preprocessPosts(feed.items);
}


