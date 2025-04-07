# Complete LLM-Friendly Bluesky Feed Format Specification

## Format Overview

This format represents Bluesky posts in a way that maximizes comprehension by Large Language Models while maintaining structural clarity and relationship information.

## Core Structure

### Posts Container
All content is wrapped in a `<posts>` tag containing individual posts.

### Post Types
Posts can have multiple types, including:
- `standalone` - A regular post
- `reply` - A response to another post
- `quote` - A post that embeds another post with added commentary
- `reply_limited` - A post with limited reply capabilities

### Repost Structure
Reposts use a dedicated `<repost>` tag structure containing:
- Attributes of the person who reposted it (author_name, author_handle, resposted_at)
- A timestamp for when the repost occurred
- The full original post structure inside the repost tag

### Embed Types
Embeds can have the following types:
- `image` - An image attachment
- `video` - A video attachment
- `link` - An external link
- `record` - A reference to a Bluesky record

## Complete Specification Example

```xml
<posts>
  <!-- Example of a post with replies -->
  <post type="standalone" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwjm7dgkc2o" bsky_url="https://bsky.app/profile/volts.wtf/post/3llwjm7dgkc2o" author_name="David Roberts" author_handle="volts.wtf" posted_at="4/3/2025, 6:25 PM">
    <content>
      "nothing could have prepared us for the breadth or intensity of the assault on climate action that Trump has unleashed during his first months back in office." I know it's hard to keep Trump's horrors straight, but in the fullness of history, this is likely to be seen as the worst.
    </content>
    
    <embed type="link">
      Title: "Years of Climate Action Demolished in Days: A Timeline"
      URL: https://www.bloomberg.com/opinion/features/2025-03-26/years-of-climate-action-are-being-demolished-in-days-by-trump-a-timeline
      Description: "Trump's environmental directives are gutting basic protections for Americans and the agencies designed to deliver them."
    </embed>
    
    Engagement: 331 likes, 155 reposts, 19 replies, 10 quotes
    
    <replies>
      <post type="reply" parent_uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwjm7dgkc2o" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkeghjyk2o" bsky_url="https://bsky.app/profile/volts.wtf/post/3llwkeghjyk2o" author_name="David Roberts" author_handle="volts.wtf" posted_at="4/3/2025, 6:38 PM">
        <content>
          Meanwhile: "The damage climate change will inflict on the world's economy is likely to have been massively underestimated, according to new research by my colleagues and I which accounts for the full global reach of extreme weather and its aftermath."
        </content>
        
        <embed type="link">
          Title: "Climate Change Could Wipe 40% Off Global Economy, Study Predicts"
          URL: https://www.sciencealert.com/climate-change-could-wipe-40-off-global-economy-study-predicts
          Description: "The damage climate change will inflict on the world's economy is likely to have been massively underestimated..."
        </embed>
        
        Engagement: 52 likes, 12 reposts, 2 replies, 1 quote
        
        <replies>
          <post type="reply" parent_uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkeghjyk2o" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkkfiias2o" bsky_url="https://bsky.app/profile/volts.wtf/post/3llwkkfiias2o" author_name="David Roberts" author_handle="volts.wtf" posted_at="4/3/2025, 6:42 PM">
            <content>
              By the way, these links came to me via @billmckibben.bsky.social's excellent newsletter, to which I assume you are all already subscribed.
            </content>
            
            <embed type="link">
              Title: "Hands off...the future"
              URL: https://billmckibben.substack.com/p/hands-offthe-future
              Description: "So many ways to wreck an economy, and Trump is trying them all"
            </embed>
            
            Engagement: 13 likes, 2 reposts, 0 replies, 0 quotes
          </post>
        </replies>
      </post>
    </replies>
  </post>
  
  <!-- Example of a repost -->
  <repost author_name="Dan Hon" author_handle="danhon.com" reposted_at="4/3/2025, 6:21 PM">
    <post type="reply_limited" uri="at://did:plc:original/app.bsky.feed.post/original" bsky_url="https://bsky.app/profile/prisonculture.bsky.social/post/original" author_name="Prisonculture" author_handle="prisonculture.bsky.social" posted_at="4/3/2025, 5:55 PM">
      <content>
        People who told everyone that masking was the worst possible thing to be asked to do are now telling USians that "sacrifice" and it's so ridiculous.
      </content>
      
      Engagement: 523 likes, 108 reposts, 12 replies
      Thread settings: Replies limited to followers/following
    </post>
  </repost>
  
  <!-- Example of a post with an image -->
  <post type="standalone" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lluh2z5vxs2m" bsky_url="https://bsky.app/profile/futur.blue/post/3lluh2z5vxs2m" author_name="futur" author_handle="futur.blue" posted_at="4/2/2025, 3:34 PM">
    <content>
      have you tried not using a platform that charges you $30 / 100GB of bandwidth
    </content>
    
    <embed type="image">
      Image description: "AI crawlers are wrecking the open internet. My small side project - techpays .com - used to generate below 100GB of traffic per month. It's on Render where 500GB/month included, above it's $30 per 100GB. Meta's AI crawler + other bots have pushed it to 700GB+ per month. WTH"
      URL: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:uu5axsmbm2or2dngy4gwchec/bafkreid63xdhokzxbc7oafwf3vcad6tzsuwkalhm4swkhjkp4sqylnkcba@jpeg
    </embed>
    
    Engagement: 6 likes, 0 reposts, 0 replies
  </post>
  
  <!-- Example of a quote post -->
  <post type="quote" uri="at://did:plc:7r5xfysukluplxs2hufswhe4/app.bsky.feed.post/3llud3c2th224" bsky_url="https://bsky.app/profile/nickcunningham.bsky.social/post/3llud3c2th224" author_name="Nick Cunningham" author_handle="nickcunningham.bsky.social" posted_at="4/2/2025, 9:23 PM">
    <content>
      Congress would impeach, and Democrats would vote with Republicans to remove him from office... Or, you know, there'd be a coup
    </content>
    
    <quoted_post uri="at://did:plc:e62gb2ushvtvjvqcbrxeaw2n/app.bsky.feed.post/3lluaqbsgck2g" bsky_url="https://bsky.app/profile/chrislhayes.bsky.social/post/3lluaqbsgck2g" author_name="Chris Hayes" author_handle="chrislhayes.bsky.social" posted_at="4/2/2025, 8:41 PM">
      <content>
        Can't help but feel that if President Bernie Sanders pulled this move the entirety of American business would try to get him pushed out of office immediately.
      </content>
      
      Engagement: 8213 likes, 1098 reposts, 300 replies
    </quoted_post>
    
    Engagement: 1 like, 0 reposts, 0 replies
  </post>
  
  <!-- Example of a post with a video -->
  <post type="standalone" uri="at://did:plc:gfrmhdmjvxn2sjedzboeudef/app.bsky.feed.post/3llucfyjpts2u" bsky_url="https://bsky.app/profile/cameron.pfiffer.org/post/3llucfyjpts2u" author_name="Mr. Dr. Cameron Pfiffer" author_handle="cameron.pfiffer.org" posted_at="4/2/2025, 9:11 PM">
    <content>
      Dude my left foot is swollen af (this is normal)
    </content>
    
    <embed type="video">
      Video description: Description of the video
      Thumbnail: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/thumbnail.jpg
      Playlist: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/playlist.m3u8
    </embed>
    
    Engagement: 2 likes, 0 reposts, 3 replies
  </post>
  
  <!-- Example of a post with external link -->
  <post type="standalone" uri="at://did:plc:pxfxhbwjtscbmvbe62shdqbe/app.bsky.feed.post/3llueyg4emc2k" bsky_url="https://bsky.app/profile/littleironwaltz.com/post/3llueyg4emc2k" author_name="Koji" author_handle="littleironwaltz.com" posted_at="4/2/2025, 9:57 PM">
    <content>
      We have an official C# MCP SDK
    </content>
    
    <embed type="link">
      Title: "Microsoft partners with Anthropic to create official C# SDK for Model Context Protocol"
      URL: https://devblogs.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol
      Description: "Microsoft is collaborating with Anthropic to create an official C# SDK for the Model Context Protocol (MCP). MCP has seen rapid adoption in the AI community, and this partnership aims to enhance the i..."
      Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:pxfxhbwjtscbmvbe62shdqbe/bafkreig4gxjejqcb2dsuvqgk7edi24vjmwtricry5qn7wycenescq52inq@jpeg
    </embed>
    
    Engagement: 0 likes, 0 reposts, 0 replies
  </post>
  
  <!-- Example of a complex post with multiple attributes -->
  <post type="reply,quote" uri="at://did:plc:example/app.bsky.feed.post/complex" bsky_url="https://bsky.app/profile/complex/post/complex" author_name="Complex Example" author_handle="complex" posted_at="4/3/2025, 7:15 PM">
    <content>
      This is an example of a complex post with multiple media types and attributes
    </content>
    
    <reply_to uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lluh2z5vxs2m" bsky_url="https://bsky.app/profile/futur.blue/post/3lluh2z5vxs2m" author_name="futur" author_handle="futur.blue">
      <content>
        have you tried not using a platform that charges you $30 / 100GB of bandwidth
      </content>
    </reply_to>
    
    <quoted_post uri="at://did:plc:pxfxhbwjtscbmvbe62shdqbe/app.bsky.feed.post/3llueyg4emc2k" bsky_url="https://bsky.app/profile/littleironwaltz.com/post/3llueyg4emc2k" author_name="Koji" author_handle="littleironwaltz.com" posted_at="4/2/2025, 9:57 PM">
      <content>
        We have an official C# MCP SDK
      </content>
    </quoted_post>
    
    <embed type="image">
      Image: "Description of the first image"
      URL: https://example.com/image1.jpg
    </embed>
    
    <embed type="image">
      Image: "Description of the second image"
      URL: https://example.com/image2.jpg
    </embed>
    
    <embed type="video">
      Thumbnail: https://example.com/video-thumb.jpg
      URL: https://example.com/video.mp4
    </embed>
    
    Engagement: 8 likes, 1 repost, 2 replies
  </post>
</posts>
```

## Format Details

### Post Information
Each post includes:
- `uri` - The full Bluesky URI for the post (used for identification)
- `bsky_url` - The web URL where the post can be viewed
- `type` - Comma-separated list of post attributes/types
- `author_name` - The display name of the post author
- `author_handle` - The handle of the post author
- `posted_at` - Timestamp when the post was created
- Post content (wrapped in `<content>` tags)
- Engagement metrics (likes, reposts, replies, quotes)

### Repost Information
Reposts use a dedicated structure containing:
- `<repost>` - Container for the repost with attributes:
  - `author_name` - Display name of the user who reposted
  - `author_handle` - Handle of the user who reposted
  - `reposted_at` - Timestamp of when the repost occurred
- The original post is nested within the repost container with its full structure

### Embed Information
Embeds are contained in `<embed>` tags with a type attribute:
- `type="image"` - For images
- `type="video"` - For videos
- `type="link"` - For external links
- `type="record"` - For references to Bluesky records

### Special Sections
- `<quoted_post>` - For embedded/quoted posts, includes author attributes
- `<reply_to>` - Reference to the post being replied to, includes author attributes

### Hierarchical Structure
- Replies can be nested in `<replies>` tags under their parent post
- The `parent_uri` attribute provides explicit relationship information by referencing the URI of the parent post

## Implementation Notes

1. The format separates structure (using XML) from content (using content tags)
2. Post types indicate the post's function, while embed types indicate the type of embedded content
3. Post URIs are used as primary identifiers for posts and references
4. Author information is provided as attributes on each post element
5. Content is explicitly wrapped in `<content>` tags for better clarity
6. Posts are grouped in a simple container without complex thread relationships
7. All elements maintain clear, consistent formatting for better LLM comprehension
8. Reposts use a dedicated `<repost>` container that wraps the original post structure
9. Timestamps are included as attributes on post elements rather than in the text content

This format provides a robust, flexible way to represent Bluesky posts that balances the needs of LLM comprehension with accurate representation of the original content and relationships.