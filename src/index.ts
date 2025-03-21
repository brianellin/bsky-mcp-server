#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { AtpAgent } from "@atproto/api";
import * as dotenv from "dotenv";
import { 
  createErrorResponse, 
  createSuccessResponse, 
  fetchFeedPosts, 
  fetchPostsFromListMembers, 
  fetchUserPosts, 
  formatPost, 
  formatSummaryText, 
  getFeedNameFromId, 
  validateUri,
} from './utils.js';

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

// Create server instance
const server = new McpServer({
  name: "bluesky-integration",
  version: "1.0.0",
});

// Add Bluesky platform context resource
server.resource(
  "bluesky-platform-info",
  "bluesky://platform-info",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: `# Bluesky Platform Overview

## What is Bluesky?
Bluesky is a decentralized social media platform that operates on the AT Protocol (Authenticated Transfer Protocol). 
It was initially incubated at Twitter (now X) but is now an independent project. Bluesky combines the familiar experience 
of mainstream social media with the open infrastructure of decentralized technology.

## Key Features and Concepts

### AT Protocol
The AT Protocol (ATP) is the foundation of Bluesky, a decentralized protocol for social networking that:
- Gives users control over their data and relationships
- Allows multiple services to interoperate
- Enables account portability between services
- Supports open algorithms for content discovery

### DIDs (Decentralized Identifiers)
Users on Bluesky are identified by DIDs, which are permanent identifiers that remain consistent even if you change your handle or move to a different service.
Example DID: did:plc:abcdefghijklmnop

### Handles
User-friendly names (similar to usernames) that can be changed while your DID remains the same. Handles are unqiue domain names. 
Example: @alice.bsky.social

### Posts
The basic unit of content on Bluesky, similar to tweets. Posts are also sometimes called "Skeets". Posts can include:
- Text (limited to around 300 characters)
- Images
- Embedded links with preview cards
- Mentions of other users
- Hashtags

### Content Types and Interactions
- Posts: Original content
- Replies: Responses to posts
- Reposts: Sharing others' posts (similar to retweets)
- Quotes: Sharing posts with your own commentary
- Likes: Appreciating content

### Feeds
Collections of posts organized in different ways:
- Home Timeline: Posts from users you follow
- What's Hot: Popular content across the network
- Custom Feeds: Algorithmically curated feeds created by users or services

### Lists
Collections of users for organizing follows or for moderation purposes:
- Following Lists: Groups of users you follow for specific topics
- Moderation Lists: Can be used to mute or filter certain content

### Federation and Decentralization
Bluesky operates on a federated model where:
- Different servers (Personal Data Servers or PDSes) can host user data
- Users maintain control over their identity and data
- Services can interoperate through the shared AT Protocol

### Moderation
Bluesky employs a hybrid approach to moderation:
- User-level tools: Muting, blocking, content filtering
- Service-level moderation: Platform rules and enforcement
- Shared reputation systems through labelers
- Custom feeds that can filter content based on user preferences

### Open Architecture
- Open-source codebase
- Open algorithmic recommendations
- Developers can build custom clients and services
- APIs are publicly accessible

## Platform Culture
- Focus on conversation and text content
- Strong developer and early-adopter community
- Emphasis on user control and transparency
- Growing creative communities including writers, journalists, artists, and technologists
- Interest in innovative social media features and alternatives to mainstream platforms

## Current Status
Bluesky is currently in active development and growth, with new features being regularly added.
The platform is fully functional but continues to evolve with user feedback and community input.`
    }]
  })
);

// Add Bluesky post schema documentation resource
server.resource(
  "bluesky-post-schema",
  "bluesky://post-schema",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: `# Bluesky Post Schema Documentation

## Post Structure
A Bluesky post (app.bsky.feed.post) is structured with these main components:

\`\`\`typescript
interface Post {
  // Core post data
  uri: string;           // The unique URI identifier for the post
  cid: string;           // The content identifier (hash of the post content)
  author: ActorRef;      // Reference to the post author
  record: PostRecord;    // The actual content record of the post
  indexedAt: string;     // ISO timestamp when the post was indexed

  // Engagement metrics
  replyCount?: number;   // Number of replies to this post
  repostCount?: number;  // Number of reposts of this post
  likeCount?: number;    // Number of likes this post has received
  quoteCount?: number;   // Number of quotes of this post

  // Optional fields for context
  embed?: Embed;         // Embedded content (images, links, quoted posts)
  reply?: ReplyRef;      // If this is a reply, reference to parent/root posts
  reason?: ReasonRepost; // If this is shown due to a repost, info about who reposted
  
  // Viewer-specific information
  viewer?: ViewerState;  // The authenticated user's relationship to this post
  labels?: Label[];      // Content labels applied to this post
}

interface ActorRef {
  did: string;           // The decentralized identifier of the user
  handle: string;        // The user's handle (username)
  displayName?: string;  // The user's chosen display name
  avatar?: string;       // URL to the user's avatar image
  labels?: Label[];      // Labels applied to this user
}

interface PostRecord {
  text: string;          // The text content of the post
  createdAt: string;     // ISO timestamp when the post was created
  reply?: ReplyRef;      // If this is a reply, reference to what it's replying to
  embed?: Embed;         // Any embedded content
  facets?: Facet[];      // Rich text features like links, mentions, hashtags
  langs?: string[];      // Language tags for this post
}

interface Embed {
  $type: string;         // Type of embed (images, external link, record, etc.)
  // Fields specific to the embed type
}

interface ViewerState {
  repost?: string;       // URI of the viewer's repost of this post, if any
  like?: string;         // URI of the viewer's like of this post, if any
  quoteID?: string;      // URI of the viewer's quote of this post, if any
  markRead?: boolean;    // Whether the viewer has marked this as read
  muted?: boolean;       // Whether the viewer has muted this thread
}

interface Facet {
  index: { byteStart: number, byteEnd: number };  // Position in text
  features: FacetFeature[];  // Features like mentions, links, tags
}

interface FacetFeature {
  $type: string;         // Type of feature (mention, link, tag)
  // Fields specific to the feature type
}
\`\`\`

## Common Embed Types

### Images
\`\`\`typescript
interface ImagesEmbed {
  $type: "app.bsky.embed.images";
  images: Image[];       // Array of images
}

interface Image {
  alt: string;           // Alt text for accessibility
  image: Blob;           // The image blob reference
  aspectRatio?: { width: number, height: number };
}
\`\`\`

### External Links
\`\`\`typescript
interface ExternalEmbed {
  $type: "app.bsky.embed.external";
  external: {
    uri: string;         // Link URL
    title: string;       // Page title
    description?: string; // Page description
    thumb?: Blob;        // Thumbnail image
  }
}
\`\`\`

### Record (Quote Posts)
\`\`\`typescript
interface RecordEmbed {
  $type: "app.bsky.embed.record";
  record: {
    uri: string;         // URI of the quoted post
    cid: string;         // CID of the quoted post
    author: ActorRef;    // Author of the quoted post
    value?: PostRecord;  // Content of the quoted post
    // Other fields similar to a regular post
  }
}
\`\`\`

### Record with Media
\`\`\`typescript
interface RecordWithMediaEmbed {
  $type: "app.bsky.embed.recordWithMedia";
  record: RecordEmbed;   // The quoted post
  media: ImagesEmbed;    // The attached media
}
\`\`\`

## Facet Features

### Mention
\`\`\`typescript
interface MentionFeature {
  $type: "app.bsky.richtext.facet#mention";
  did: string;           // DID of the mentioned user
}
\`\`\`

### Link
\`\`\`typescript
interface LinkFeature {
  $type: "app.bsky.richtext.facet#link";
  uri: string;           // URL of the link
}
\`\`\`

### Tag (Hashtag)
\`\`\`typescript
interface TagFeature {
  $type: "app.bsky.richtext.facet#tag";
  tag: string;           // The hashtag text (without the #)
}
\`\`\`

## Reply Context
\`\`\`typescript
interface ReplyRef {
  root: {                // The root of the thread
    uri: string;         // URI of the root post
    cid: string;         // CID of the root post
  };
  parent: {              // The direct parent being replied to
    uri: string;         // URI of the parent post
    cid: string;         // CID of the parent post
  };
}
\`\`\`

This schema documentation provides a comprehensive overview of the structure of Bluesky posts and their components. The actual implementation may have additional fields or slight variations.`
    }]
  })
);

// Initialize ATP agent and session
let agent: AtpAgent | null = null;

// Connect to Bluesky using environment variables
async function initializeBlueskyConnection() {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  const service = process.env.BLUESKY_SERVICE_URL || "https://bsky.social";

  if (!identifier || !password) {
    console.error("Error: BLUESKY_IDENTIFIER and BLUESKY_APP_PASSWORD environment variables must be set");
    return false;
  }

  try {
    agent = new AtpAgent({ service });
    const result = await agent.login({ identifier, password });
    
    if (result.success) {
      console.error(`Successfully logged in as ${result.data.handle} (${result.data.did})`);
      return true;
    } else {
      console.error("Login failed: Invalid credentials.");
      return false;
    }
  } catch (error) {
    console.error(`Login failed: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}


server.tool(
  "get-timeline",
  "Fetch your home timeline from Bluesky",
  {
    limit: z.number().min(1).max(100).default(50).describe("Number of posts to fetch (1-100)"),
  },
  async ({ limit }) => {
    try {
      if (!agent) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Not connected to Bluesky. Check your environment variables.",
            },
          ],
        };
      }

      const MAX_TOTAL_POSTS = 1000; // Safety limit to prevent excessive API calls
      
      // Initial fetch using at most 100 posts per request
      const initialFetchLimit = Math.min(100, limit);
      
      const response = await agent.getTimeline({ limit: initialFetchLimit });
      
      if (!response.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to fetch timeline.",
            },
          ],
        };
      }

      const allPosts: any[] = response.data.feed;
      let nextCursor = response.data.cursor;
      
      // If we have more posts available (cursor exists),
      // keep paginating until we reach the maximum post limit
      if (nextCursor && allPosts.length < MAX_TOTAL_POSTS) {
        // For safety, don't fetch more than 10 pages
        let paginationCount = 0;
        while (nextCursor && paginationCount < 10 && allPosts.length < MAX_TOTAL_POSTS) {
          paginationCount++;
          
          try {
            const nextPage = await agent.getTimeline({
              cursor: nextCursor,
              limit: initialFetchLimit
            });
            
            if (nextPage.success) {
              allPosts.push(...nextPage.data.feed);
              nextCursor = nextPage.data.cursor;
            } else {
              // If we hit an error, just use what we have
              break;
            }
          } catch (error) {
            // If we hit an error, just use what we have
            break;
          }
        }
      }
      
      // Parse and format posts
      const filteredFeed = [...allPosts];
      
      // Limit the posts to the requested limit
      const finalPosts = filteredFeed.length > limit
        ? filteredFeed.slice(0, limit)
        : filteredFeed;
      
      if (finalPosts.length === 0) {
        return createSuccessResponse("Your timeline is empty.");
      }
      
      // Use the enhanced formatter for each post
      const timelineData = finalPosts.map((item, index) => formatPost(item, index)).join("\n\n");
      
      const summaryText = formatSummaryText(finalPosts.length, "timeline");
      
      return {
        content: [
          {
            type: "text",
            text: `${summaryText}\n\n${timelineData}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error fetching timeline: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "post",
  "Create a new post on Bluesky",
  {
    text: z.string().max(300).describe("The content of your post"),
    replyTo: z.string().optional().describe("Optional URI of post to reply to"),
  },
  async ({ text, replyTo }) => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not connected to Bluesky. Check your environment variables.",
          },
        ],
      };
    }

    try {
      const record: any = {
        text,
        createdAt: new Date().toISOString(),
      };

      let replyRef;
      if (replyTo) {
        // Handle reply format
        try {
          const parts = replyTo.split('/');
          const did = parts[2];
          const rkey = parts[parts.length - 1];
          const collection = parts[parts.length - 2] === 'app.bsky.feed.post' ? 'app.bsky.feed.post' : parts[parts.length - 2];
          
          // Resolve the CID of the post we're replying to
          const cidResponse = await agent.app.bsky.feed.getPostThread({ uri: replyTo });
          if (!cidResponse.success) {
            throw new Error('Could not get post information');
          }
          
          const threadPost = cidResponse.data.thread as any;
          const parentCid = threadPost.post.cid;
          
          // Add reply information to the record
          record.reply = {
            parent: { uri: replyTo, cid: parentCid },
            root: { uri: replyTo, cid: parentCid }
          };

        } catch (error) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Error parsing reply URI: ${error instanceof Error ? error.message : String(error)}`,
              },
            ],
          };
        }
      }

      const response = await agent.post(record);
      
      return {
        content: [
          {
            type: "text",
            text: `Post created successfully! URI: ${response.uri}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error creating post: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get-profile",
  "Get a user's profile from Bluesky",
  {
    handle: z.string().describe("The handle of the user (e.g., alice.bsky.social)"),
  },
  async ({ handle }) => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not logged in. Please use the login tool first.",
          },
        ],
      };
    }

    try {
      const response = await agent.getProfile({ actor: handle });
      
      if (!response.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Failed to get profile for ${handle}.`,
            },
          ],
        };
      }

      const profile = response.data;
      
      let profileText = `Profile for ${profile.displayName || handle} (@${profile.handle})
DID: ${profile.did}
${profile.description ? `Bio: ${profile.description}` : ''}
Followers: ${profile.followersCount || 0}
Following: ${profile.followsCount || 0}
Posts: ${profile.postsCount || 0}
${profile.labels?.length ? `Labels: ${profile.labels.map((l: any) => l.val).join(', ')}` : ''}`;

      return {
        content: [
          {
            type: "text",
            text: profileText,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error fetching profile: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "search-posts",
  "Search for posts on Bluesky",
  {
    query: z.string().describe("Search query"),
    limit: z.number().min(1).max(100).default(50).describe("Number of results to fetch (1-100)"),
    sort: z.enum(["top", "latest"]).default("top").describe("Sort order for search results - 'top' for most relevant or 'latest' for most recent"),
  },
  async ({ query, limit, sort }) => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not logged in. Please use the login tool first.",
          },
        ],
      };
    }

    try {
      const response = await agent.app.bsky.feed.searchPosts({ q: query, limit, sort });
      
      if (!response.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to search posts.",
            },
          ],
        };
      }

      const { posts } = response.data;
      
      if (posts.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No results found for query: "${query}"`,
            },
          ],
        };
      }

      const results = posts.map((post: any, index: number) => {
        const author = post.author;
        
        return `Result #${index + 1}:
Author: ${author.displayName || author.handle} (@${author.handle})
Content: ${post.record.text}
${post.likeCount !== undefined ? `Likes: ${post.likeCount}` : ''}
${post.repostCount !== undefined ? `Reposts: ${post.repostCount}` : ''}
URI: ${post.uri}
Posted: ${new Date(post.indexedAt).toLocaleString()}
---`;
      }).join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: results,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error searching posts: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "search-people",
  "Search for users/actors on Bluesky",
  {
    query: z.string().describe("Search query for finding users"),
    limit: z.number().min(1).max(100).default(20).describe("Number of results to fetch (1-100)"),
  },
  async ({ query, limit }) => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not logged in. Please use the login tool first.",
          },
        ],
      };
    }

    try {
      const response = await agent.app.bsky.actor.searchActors({ q: query, limit });
      
      if (!response.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to search for users.",
            },
          ],
        };
      }

      const { actors } = response.data;
      
      if (actors.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No users found for query: "${query}"`,
            },
          ],
        };
      }

      const results = actors.map((actor: any, index: number) => {
        return `User #${index + 1}:
Display Name: ${actor.displayName || 'No display name'}
Handle: @${actor.handle}
DID: ${actor.did}
${actor.description ? `Bio: ${actor.description}` : 'Bio: No bio provided'}
${actor.followersCount !== undefined ? `Followers: ${actor.followersCount}` : ''}
${actor.followsCount !== undefined ? `Following: ${actor.followsCount}` : ''}
${actor.postsCount !== undefined ? `Posts: ${actor.postsCount}` : ''}
${actor.indexedAt ? `Indexed At: ${new Date(actor.indexedAt).toLocaleString()}` : ''}
---`;
      }).join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: results,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error searching for users: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "search-feeds",
  "Search for custom feeds on Bluesky",
  {
    query: z.string().describe("Search query for finding feeds"),
    limit: z.number().min(1).max(100).default(10).describe("Number of results to fetch (1-100)"),
  },
  async ({ query, limit }) => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not logged in. Please use the login tool first.",
          },
        ],
      };
    }

    try {
      const response = await agent.api.app.bsky.unspecced.getPopularFeedGenerators({ 
        query, 
        limit 
      });
      
      if (!response.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to search for feeds.",
            },
          ],
        };
      }

      const { feeds } = response.data;
      
      if (!feeds || feeds.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No feeds found for query: "${query}"`,
            },
          ],
        };
      }

      const results = feeds.map((feed: any, index: number) => {
        return `Feed #${index + 1}:
Name: ${feed.displayName || 'Unnamed Feed'}
URI: ${feed.uri}
${feed.description ? `Description: ${feed.description}` : ''}
Creator: @${feed.creator.handle} ${feed.creator.displayName ? `(${feed.creator.displayName})` : ''}
Likes: ${feed.likeCount || 0}
${feed.indexedAt ? `Indexed At: ${new Date(feed.indexedAt).toLocaleString()}` : ''}
---`;
      }).join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: results,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error searching for feeds: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);


server.tool(
  "like-post",
  "Like a post on Bluesky",
  {
    uri: z.string().describe("The URI of the post to like"),
  },
  async ({ uri }) => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not logged in. Please use the login tool first.",
          },
        ],
      };
    }

    try {
      // First, we need to get the CID of the post
      const parts = uri.split('/');
      const repo = parts[2]; // The DID
      const collection = parts[4]; // Usually app.bsky.feed.post
      const rkey = parts[5]; // The record key
      
      const response = await agent.app.bsky.feed.getPostThread({ uri });
      
      if (!response.success || response.data.thread.$type !== 'app.bsky.feed.defs#threadViewPost') {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to get post information.",
            },
          ],
        };
      }
      
      // Type assertion to tell TypeScript this is a post
      const threadPost = response.data.thread as any;
      const post = threadPost.post;
      const cid = post.cid;
      
      await agent.like(uri, cid);
      
      return {
        content: [
          {
            type: "text",
            text: "Post liked successfully!",
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error liking post: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "follow-user",
  "Follow a user on Bluesky",
  {
    handle: z.string().describe("The handle of the user to follow"),
  },
  async ({ handle }) => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not logged in. Please use the login tool first.",
          },
        ],
      };
    }

    try {
      // Resolve the handle to a DID
      const resolveResponse = await agent.resolveHandle({ handle });
      
      if (!resolveResponse.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Failed to resolve handle: ${handle}`,
            },
          ],
        };
      }
      
      const did = resolveResponse.data.did;
      await agent.follow(did);
      
      return {
        content: [
          {
            type: "text",
            text: `Successfully followed @${handle}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error following user: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get-pinned-feeds",
  "Get the authenticated user's pinned feeds and lists.",
  {},
  async () => {
    if (!agent) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Not connected to Bluesky. Check your environment variables.",
          },
        ],
      };
    }

    try {
      // Get user preferences which include pinned feeds
      const response = await agent.app.bsky.actor.getPreferences();
      
      if (!response.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to get user preferences.",
            },
          ],
        };
      }

      // Find the savedFeedsPrefV2 in preferences
      const savedFeedsPref = response.data.preferences.find((pref: any) => 
        pref.$type === 'app.bsky.actor.defs#savedFeedsPrefV2'
      ) as { $type: string, items: Array<{ id: string, pinned: boolean, type: string, value: string }> } | undefined;
      
      if (!savedFeedsPref || !savedFeedsPref.items) {
        return {
          content: [
            {
              type: "text",
              text: "No saved feeds found in user preferences.",
            },
          ],
        };
      }

      // Get the pinned feeds
      const pinnedFeeds = savedFeedsPref.items.filter((item: any) => item.pinned);
      
      if (pinnedFeeds.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "You don't have any pinned feeds.",
            },
          ],
        };
      }

      // Get additional details for each feed
      const feedDetails = await Promise.all(
        pinnedFeeds.map(async (feed: any) => {
          try {
            // Custom feeds (regular feeds)
            if (feed.type === 'feed' && feed.value) {
              const feedInfo = await agent?.app.bsky.feed.getFeedGenerator({ 
                feed: feed.value 
              });
              
              if (feedInfo?.success) {
                return {
                  id: feed.id,
                  uri: feed.value,
                  name: feedInfo.data.view.displayName,
                  description: feedInfo.data.view.description || 'No description',
                  creator: `@${feedInfo.data.view.creator.handle}`,
                  type: 'Custom Feed'
                };
              }
            }
            
            // Lists
            else if (feed.type === 'list' && feed.value) {
              const listInfo = await agent?.app.bsky.graph.getList({ 
                list: feed.value 
              });
              
              if (listInfo?.success) {
                const list = listInfo.data.list;
                const memberCount = listInfo.data.items.length;
                
                return {
                  id: feed.id,
                  uri: feed.value,
                  name: list.name,
                  description: list.description || 'No description',
                  creator: `@${list.creator.handle}`,
                  members: memberCount,
                  purpose: list.purpose === 'app.bsky.graph.defs#curatelist' ? 'Curated List' : 
                          list.purpose === 'app.bsky.graph.defs#modlist' ? 'Moderation List' : 
                          'Unknown Purpose',
                  type: 'List'
                };
              }
            }
            
            // For built-in feeds or if feed generator info failed
            return {
              id: feed.id,
              uri: feed.value || 'N/A',
              name: getFeedNameFromId(feed.id),
              description: 'Built-in feed',
              creator: 'Bluesky',
              type: feed.type
            };
          } catch (error) {
            return {
              id: feed.id,
              uri: feed.value || 'N/A',
              name: getFeedNameFromId(feed.id),
              description: 'Error fetching details',
              type: feed.type
            };
          }
        })
      );

      const formattedFeeds = feedDetails.map((feed: any, index: number) => {
        // Common fields
        let output = `Feed #${index + 1}:
Name: ${feed.name}
Type: ${feed.type}
${feed.uri !== 'N/A' ? `URI: ${feed.uri}` : ''}
${feed.description ? `Description: ${feed.description}` : ''}
${feed.creator ? `Creator: ${feed.creator}` : ''}`;

        // List-specific fields
        if (feed.type === 'List') {
          output += `\n${feed.members !== undefined ? `Members: ${feed.members}` : ''}
${feed.purpose ? `Purpose: ${feed.purpose}` : ''}`;
        }

        output += '\n---';
        return output;
      }).join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `Your Pinned Feeds:\n\n${formattedFeeds}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error fetching pinned feeds: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

server.tool(
  "get-feed-posts",
  "Fetch posts from a specified feed",
  {
    feed: z.string().describe("The URI of the feed to fetch posts from (e.g., at://did:plc:abcdef/app.bsky.feed.generator/whats-hot)"),
    limit: z.number().min(1).max(100).default(50).describe("Number of posts to fetch (1-100)"),
  },
  async ({ feed, limit }) => {
    if (!agent) {
      return createErrorResponse("Not connected to Bluesky. Check your environment variables.");
    }

    const currentAgent = agent; // Assign to non-null variable to satisfy TypeScript
    
    try {
      // First, validate the feed by getting its info
      const feedInfo = await validateUri(currentAgent, feed, 'feed');
      if (!feedInfo) {
        return createErrorResponse(`Invalid feed URI or feed not found: ${feed}.`);
      }

      const maxPostsToFetch = 500; // For time-based fetching, we might need to retrieve more posts
      
      // Fetch posts from the feed
      const { posts: allPosts } = await fetchFeedPosts(currentAgent, feed, {
        maxPosts: maxPostsToFetch,
      });

      // Limit the posts to the requested limit
      const finalPosts = allPosts.length > limit 
        ? allPosts.slice(0, limit) 
        : allPosts;

      // If no posts were found after filtering
      if (finalPosts.length === 0) {
        return createSuccessResponse(`No posts found in the feed: ${feed}`);
      }

      // Format the posts
      const formattedPosts = finalPosts.map((item, index) => formatPost(item, index)).join("\n\n");

      // Add summary information
      const summaryText = formatSummaryText(finalPosts.length, "feed");

      return createSuccessResponse(`${summaryText}\n\n${formattedPosts}`);
    } catch (error) {
      return createErrorResponse(`Error fetching posts: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get-list-posts",
  "Fetch posts from users in a specified list",
  {
    list: z.string().describe("The URI of the list (e.g., at://did:plc:abcdef/app.bsky.graph.list/listname)"),
    limit: z.number().min(1).max(100).default(50).describe("Number of posts to fetch (1-100)"),
  },
  async ({ list, limit }) => {
    if (!agent) {
      return createErrorResponse("Not connected to Bluesky. Check your environment variables.");
    }

    const currentAgent = agent; // Assign to non-null variable to satisfy TypeScript
    
    try {
      // Validate the list by getting its info
      const listInfo = await validateUri(currentAgent, list, 'list');
      if (!listInfo) {
        return createErrorResponse(`Invalid list URI or list not found: ${list}.`);
      }

      // Get the list members
      const members = listInfo.items.map((item: any) => item.subject.did);
      
      if (members.length === 0) {
        return createSuccessResponse(`The list ${listInfo.list.name} doesn't have any members.`);
      }

      const maxPostsToFetch = 500; // For time-based fetching, we might need to retrieve more posts
      
      // Fetch posts from list members
      const allPosts = await fetchPostsFromListMembers(currentAgent, members, {
        maxPosts: maxPostsToFetch,
      });

      // Limit the posts to the requested limit
      const finalPosts = allPosts.length > limit 
        ? allPosts.slice(0, limit) 
        : allPosts;

      // If no posts were found after filtering
      if (finalPosts.length === 0) {
        return createSuccessResponse(`No posts found from list members.`);
      }

      // Format the posts
      const formattedPosts = finalPosts.map((item, index) => formatPost(item, index)).join("\n\n");

      // Add summary information
      const summaryText = formatSummaryText(finalPosts.length, "list");

      return createSuccessResponse(`${summaryText}\n\n${formattedPosts}`);
    } catch (error) {
      return createErrorResponse(`Error fetching list posts: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get-user-posts",
  "Fetch posts from a specific user",
  {
    user: z.string().describe("The handle or DID of the user (e.g., alice.bsky.social)"),
    limit: z.number().min(1).max(100).default(50).describe("Number of posts to fetch (1-100)"),
  },
  async ({ user, limit }) => {
    if (!agent) {
      return createErrorResponse("Not connected to Bluesky. Check your environment variables.");
    }

    const currentAgent = agent; // Assign to non-null variable to satisfy TypeScript
    
    try {
      // Verify the user exists by trying to get their profile
      try {
        const profileResponse = await currentAgent.getProfile({ actor: user });
        if (!profileResponse.success) {
          return createErrorResponse(`User not found: ${user}`);
        }
        
        // Use the display name in the summary if available
        const displayName = profileResponse.data.displayName || user;
        
        const maxPostsToFetch = 500; // For time-based fetching, we might need to retrieve more posts
        
        // Fetch posts from the user
        const { posts: allPosts } = await fetchUserPosts(currentAgent, user, {
          maxPosts: maxPostsToFetch,
        });

        // Limit the posts to the requested limit
        const finalPosts = allPosts.length > limit 
          ? allPosts.slice(0, limit) 
          : allPosts;

        // If no posts were found after filtering
        if (finalPosts.length === 0) {
          return createSuccessResponse(`No posts found from @${user}.`);
        }

        // Format the posts
        const formattedPosts = finalPosts.map((item, index) => formatPost(item, index)).join("\n\n");

        // Add summary information
        const summaryText = formatSummaryText(finalPosts.length, "user");

        return createSuccessResponse(`${summaryText}\n\n${formattedPosts}`);
      } catch (profileError) {
        return createErrorResponse(`Error retrieving user profile: ${profileError instanceof Error ? profileError.message : String(profileError)}`);
      }
    } catch (error) {
      return createErrorResponse(`Error fetching user posts: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "get-follows",
  "Get a list of users that a person follows",
  {
    user: z.string().describe("The handle or DID of the user (e.g., alice.bsky.social)"),
    limit: z.number().min(1).max(500).default(500).describe("Maximum number of follows to fetch (1-500)"),
  },
  async ({ user, limit }) => {
    if (!agent) {
      return createErrorResponse("Not connected to Bluesky. Check your environment variables.");
    }

    const currentAgent = agent; // Assign to non-null variable to satisfy TypeScript
    
    try {
      // First, verify the user exists by trying to get their profile
      try {
        const profileResponse = await currentAgent.getProfile({ actor: user });
        if (!profileResponse.success) {
          return createErrorResponse(`User not found: ${user}`);
        }
        
        // Use the display name in the summary if available
        const displayName = profileResponse.data.displayName || user;
        
        // Now fetch who this user follows with pagination
        const MAX_BATCH_SIZE = 100; // Maximum number of follows per API call
        const MAX_BATCHES = 5;      // Maximum number of API calls to make (100 x 5 = 500)
        let allFollows: any[] = [];
        let nextCursor: string | undefined = undefined;
        let batchCount = 0;
        
        // Loop to fetch follows with pagination
        while (batchCount < MAX_BATCHES && allFollows.length < limit) {
          // Calculate how many follows to fetch in this batch
          const batchLimit = Math.min(MAX_BATCH_SIZE, limit - allFollows.length);
          
          // Make the API call with cursor if we have one
          const response = await currentAgent.app.bsky.graph.getFollows({
            actor: user,
            limit: batchLimit,
            cursor: nextCursor
          });
          
          if (!response.success) {
            // If we've already fetched some follows, return those
            if (allFollows.length > 0) {
              break;
            }
            return createErrorResponse(`Failed to fetch follows for ${user}.`);
          }
          
          const { follows, cursor } = response.data;
          
          // Add the fetched follows to our collection
          allFollows = allFollows.concat(follows);
          
          // Update cursor for the next batch
          nextCursor = cursor;
          batchCount++;
          
          // If no cursor returned or we've reached our limit, stop paginating
          if (!cursor || allFollows.length >= limit) {
            break;
          }
        }
        
        if (allFollows.length === 0) {
          return createSuccessResponse(`@${user} doesn't follow anyone.`);
        }
        
        // Format the follows list
        const formattedFollows = allFollows.map((follow: any, index: number) => {
          return `User #${index + 1}:
Display Name: ${follow.displayName || 'No display name'}
Handle: @${follow.handle}
DID: ${follow.did}
${follow.description ? `Bio: ${follow.description.substring(0, 100)}${follow.description.length > 100 ? '...' : ''}` : 'Bio: No bio provided'}
${follow.followersCount !== undefined ? `Followers: ${follow.followersCount}` : ''}
${follow.followsCount !== undefined ? `Following: ${follow.followsCount}` : ''}
${follow.postsCount !== undefined ? `Posts: ${follow.postsCount}` : ''}
${follow.indexedAt ? `Following since: ${new Date(follow.indexedAt).toLocaleString()}` : ''}
---`;
        }).join("\n\n");
        
        // Create a summary
        const summaryText = `Retrieved ${allFollows.length} users that @${user} follows.${nextCursor ? ' More results are available.' : ''}`;
        
        return createSuccessResponse(`${summaryText}\n\n${formattedFollows}`);
        
      } catch (profileError) {
        return createErrorResponse(`Error retrieving user profile: ${profileError instanceof Error ? profileError.message : String(profileError)}`);
      }
    } catch (error) {
      return createErrorResponse(`Error fetching follows: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

server.tool(
  "list-blusesky-resources",
  "List all available MCP resources with their descriptions. These resources provide detailedinformation about the Bluesky platform and its schema.",
  {},
  async () => {
    const resources = [
      {
        name: "bluesky-platform-info",
        uri: "bluesky://platform-info",
        description: "Comprehensive information about the Bluesky platform, its features, and culture"
      },
      {
        name: "bluesky-post-schema",
        uri: "bluesky://post-schema",
        description: "Technical documentation of the Bluesky post schema and structure"
      }
    ];

    const formattedResources = resources.map((resource, index) => {
      return `Resource #${index + 1}:
Name: ${resource.name}
URI: ${resource.uri}
Description: ${resource.description}
---`;
    }).join("\n\n");

    return createSuccessResponse(`Available MCP Resources:\n\n${formattedResources}\n\nTo use these resources, reference them by URI in your prompts or queries.`);
  }
);

// Start the server
(async function() {
  try {
    // Initialize Bluesky connection
    await initializeBlueskyConnection();
    
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Bluesky MCP Server running on stdio");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();