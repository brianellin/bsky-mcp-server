import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers all Bluesky MCP resources on the provided MCP server
 * @param server The MCP server instance
 */
export function registerResources(server: McpServer): void {
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
User-friendly names (similar to usernames) that can be changed while your DID remains the same.
Example: @alice.bsky.social

### Posts
The basic unit of content on Bluesky, similar to tweets. Posts can include:
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
}

/**
 * Array of resource metadata for use with list-resources tool
 */
export const resourcesList = [
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