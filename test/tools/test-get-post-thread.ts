import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { AtpAgent } from "@atproto/api";
import dotenv from 'dotenv';

// Get current file path and directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

// Mock URI for testing
const TEST_POST_URI = "at://did:plc:fpruhuo22xkm5o7ttr2ktxdo/app.bsky.feed.post/3lmmuyulsoc2n";

// Initialize ATP agent
async function initializeBlueskyConnection() {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  const service = process.env.BLUESKY_SERVICE_URL || "https://bsky.social";

  if (!identifier || !password) {
    console.error("Error: BLUESKY_IDENTIFIER and BLUESKY_APP_PASSWORD environment variables must be set");
    return null;
  }

  try {
    const agent = new AtpAgent({ service });
    const result = await agent.login({ identifier, password });

    if (result.success) {
      console.log(`Successfully logged in as ${result.data.handle} (${result.data.did})`);
      return agent;
    } else {
      console.error("Login failed: Invalid credentials.");
      return null;
    }
  } catch (error) {
    console.error(`Login failed: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

// Function to escape XML special characters
function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Process a single post and all of its replies in the thread
function processThreadViewPost(threadViewPost: any, indentLevel: number): string {
  if (!threadViewPost || threadViewPost.$type !== 'app.bsky.feed.defs#threadViewPost') {
    return '';
  }
  
  const post = threadViewPost.post;
  if (!post) return '';
  
  const indent = '  '.repeat(indentLevel);
  let output = '';
  
  try {
    // Determine post type (standalone, reply, quote)
    const record = post.record;
    if (!record) {
      console.error('Record missing for post:', post.uri);
      return '';
    }
    
    const isReply = record.reply != null;
    const isQuote = post.embed?.$type === 'app.bsky.embed.record#view';
    
    let postType = 'standalone';
    if (isReply) postType = 'reply';
    if (isQuote) {
      postType = isReply ? 'reply,quote' : 'quote';
    }
    
    // Check for required fields
    if (!post.uri) {
      console.error('URI missing for post');
      return '';
    }
    
    if (!post.author || !post.author.handle) {
      console.error('Author or handle missing for post:', post.uri);
      return '';
    }
    
    // Start building post tag attributes
    let postAttrs = `type="${postType}" uri="${post.uri}" bsky_url="https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}" `;
    postAttrs += `author_name="${escapeXml(post.author.displayName || post.author.handle)}" author_handle="${post.author.handle}" `;
    postAttrs += `posted_at="${new Date(post.indexedAt || record.createdAt).toLocaleString()}"`;
    
    // Add reply_to attribute if it's a reply
    if (isReply && record.reply && record.reply.parent && record.reply.parent.uri) {
      postAttrs += ` reply_to="${record.reply.parent.uri}"`;
    }
    
    // Format the post opening tag with all attributes
    output += `${indent}<post ${postAttrs}>\n`;
    
    // Add content
    output += `${indent}  <content>\n${indent}    ${escapeXml(record.text || '')}\n${indent}  </content>\n`;
    
    // Add quoted post if present
    if (isQuote && post.embed && post.embed.record) {
      const quoted = post.embed.record;
      if (quoted.uri && quoted.author && quoted.author.handle) {
        output += `${indent}  <quoted_post uri="${quoted.uri}" `;
        output += `bsky_url="https://bsky.app/profile/${quoted.author.handle}/post/${quoted.uri.split('/').pop()}" `;
        output += `author_name="${escapeXml(quoted.author.displayName || quoted.author.handle)}" `;
        output += `author_handle="${quoted.author.handle}" `;
        output += `posted_at="${new Date(quoted.indexedAt || Date.now()).toLocaleString()}">\n`;
        output += `${indent}    <content>\n${indent}      ${escapeXml((quoted.value && quoted.value.text) || '')}\n${indent}    </content>\n`;
        
        // Add engagement metrics for quoted post
        if (quoted.likeCount || quoted.repostCount || quoted.replyCount) {
          output += `${indent}    Engagement: ${quoted.likeCount || 0} likes, ${quoted.repostCount || 0} reposts, ${quoted.replyCount || 0} replies`;
          if (quoted.quoteCount) output += `, ${quoted.quoteCount} quotes`;
          output += '\n';
        }
        
        output += `${indent}  </quoted_post>\n`;
      }
    }
    
    // Add embeds if present
    if (post.embed && post.embed.$type !== 'app.bsky.embed.record#view') {
      // Handle images
      if (post.embed.$type === 'app.bsky.embed.images#view') {
        const images = post.embed.images || [];
        for (const image of images) {
          if (!image) continue;
          output += `${indent}  <embed type="image">\n`;
          if (image.alt) {
            output += `${indent}    Image description: "${escapeXml(image.alt)}"\n`;
          }
          if (image.fullsize || image.thumb) {
            output += `${indent}    URL: ${image.fullsize || image.thumb}\n`;
          }
          output += `${indent}  </embed>\n`;
        }
      }
      // Handle external links
      else if (post.embed.$type === 'app.bsky.embed.external#view' && post.embed.external) {
        output += `${indent}  <embed type="link">\n`;
        if (post.embed.external.title) {
          output += `${indent}    Title: "${escapeXml(post.embed.external.title)}"\n`;
        }
        if (post.embed.external.uri) {
          output += `${indent}    URL: ${post.embed.external.uri}\n`;
        }
        if (post.embed.external.description) {
          output += `${indent}    Description: "${escapeXml(post.embed.external.description)}"\n`;
        }
        if (post.embed.external.thumb) {
          output += `${indent}    Thumbnail: ${post.embed.external.thumb}\n`;
        }
        output += `${indent}  </embed>\n`;
      }
      // Handle videos
      else if (post.embed.$type === 'app.bsky.embed.video#view' && post.embed.video) {
        output += `${indent}  <embed type="video">\n`;
        if (post.embed.video.alt) {
          output += `${indent}    Video description: ${escapeXml(post.embed.video.alt)}\n`;
        }
        if (post.embed.video.thumb) {
          output += `${indent}    Thumbnail: ${post.embed.video.thumb}\n`;
        }
        if (post.embed.video.url) {
          output += `${indent}    URL: ${post.embed.video.url}\n`;
        }
        output += `${indent}  </embed>\n`;
      }
    }
    
    // Add engagement metrics
    if (post.likeCount || post.repostCount || post.replyCount) {
      output += `${indent}  Engagement: ${post.likeCount || 0} likes, ${post.repostCount || 0} reposts, ${post.replyCount || 0} replies`;
      if (post.quoteCount) output += `, ${post.quoteCount} quotes`;
      output += '\n';
    }
    
    // Add replies recursively if present
    if (threadViewPost.replies && Array.isArray(threadViewPost.replies) && threadViewPost.replies.length > 0) {
      output += `${indent}  <replies>\n`;
      for (const reply of threadViewPost.replies) {
        output += processThreadViewPost(reply, indentLevel + 2);
      }
      output += `${indent}  </replies>\n`;
    }
    
    output += `${indent}</post>\n`;
  } catch (error) {
    console.error('Error processing post:', error);
    return ''; // Skip this post if there's an error
  }
  
  return output;
}

// Helper function to format a post thread according to our format spec
function formatPostThread(threadView: any): string {
  // Start building the posts XML container
  let output = "<posts>\n";
  
  // Process the root post and all of its replies
  output += processThreadViewPost(threadView, 0);
  
  // Close the posts container
  output += "</posts>";
  
  return output;
}

async function runTest() {
  // Initialize connection
  const agent = await initializeBlueskyConnection();
  if (!agent) {
    console.error("Failed to initialize Bluesky connection");
    process.exit(1);
  }
  
  try {
    console.log(`\nFetching thread for: ${TEST_POST_URI}`);
    
    // Fetch the thread
    const response = await agent.app.bsky.feed.getPostThread({
      uri: TEST_POST_URI,
      depth: 3
    });
    
    if (!response.success) {
      console.error("Failed to fetch thread:", response);
      process.exit(1);
    }
    
    console.log("Thread fetched successfully!");
    
    // Format the thread
    const formattedThread = formatPostThread(response.data.thread);
    
    // Save formatted output to file
    const outputDir = path.join(__dirname, '../../test/output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'formatted_thread.xml');
    fs.writeFileSync(outputPath, formattedThread);
    
    console.log(`\nFormatted thread saved to: ${outputPath}`);
    console.log("\nTest completed successfully!");
    
  } catch (error) {
    console.error("Error during test:", error);
    process.exit(1);
  }
}

// Run the test
runTest();
