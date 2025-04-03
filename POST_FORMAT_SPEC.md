# Complete LLM-Friendly Bluesky Feed Format Specification

## Format Overview

This format represents Bluesky posts and feeds in a way that maximizes comprehension by Large Language Models while maintaining structural clarity and relationship information.

## Core Structure

### Feed Container
All content is wrapped in a `<feed>` tag containing posts and threads.

### Reference Map
A reference map provides a lookup table for converting between simple IDs used in the format and original Bluesky URIs.

### Post Types
Posts can have multiple types, including:
- `standalone` - A regular post
- `thread_root` - The first post in a thread
- `reply` - A response to another post
- `repost` - A reshare of another user's post
- `quote` - A post that embeds another post with added commentary
- `image` - A post with image media
- `video` - A post with video media
- `link` - A post with an external link
- `mention` - A post that mentions other users
- `reply_limited` - A post with limited reply capabilities

## Complete Specification Example

```xml
<feed>
  <!-- Reference map for original post URIs -->
  <reference_map>
    <ref id="1.1" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwjm7dgkc2o" short_id="3llwjm7dgkc2o" />
    <ref id="1.2" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkeghjyk2o" short_id="3llwkeghjyk2o" />
    <ref id="1.3" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkkfiias2o" short_id="3llwkkfiias2o" />
    <ref id="2" uri="at://did:plc:6tr6tuzlx2db3rduzr2d6r24/app.bsky.feed.post/3llwhxehrac2o" short_id="3llwhxehrac2o" />
    <ref id="3" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lluh2z5vxs2m" short_id="3lluh2z5vxs2m" />
    <ref id="4" uri="at://did:plc:7r5xfysukluplxs2hufswhe4/app.bsky.feed.post/3llud3c2th224" short_id="3llud3c2th224" />
    <ref id="4.quoted" uri="at://did:plc:e62gb2ushvtvjvqcbrxeaw2n/app.bsky.feed.post/3lluaqbsgck2g" short_id="3lluaqbsgck2g" />
    <ref id="5" uri="at://did:plc:gfrmhdmjvxn2sjedzboeudef/app.bsky.feed.post/3llucfyjpts2u" short_id="3llucfyjpts2u" />
    <ref id="6" uri="at://did:plc:pxfxhbwjtscbmvbe62shdqbe/app.bsky.feed.post/3llueyg4emc2k" short_id="3llueyg4emc2k" />
  </reference_map>

  <!-- Example of a thread with multiple posts -->
  <thread id="1">
    <post id="1.1" type="thread_root,link">
      Post: "nothing could have prepared us for the breadth or intensity of the assault on climate action that Trump has unleashed during his first months back in office." I know it's hard to keep Trump's horrors straight, but in the fullness of history, this is likely to be seen as the worst.
      Author: David Roberts (@volts.wtf)
      
      <media type="link">
        Title: "Years of Climate Action Demolished in Days: A Timeline"
        URL: https://www.bloomberg.com/opinion/features/2025-03-26/years-of-climate-action-are-being-demolished-in-days-by-trump-a-timeline
        Description: "Trump's environmental directives are gutting basic protections for Americans and the agencies designed to deliver them."
      </media>
      
      Posted: 4/3/2025, 6:25 PM | Engagement: 331 likes, 155 reposts, 19 replies, 10 quotes
      
      <replies>
        <post id="1.2" type="reply,link" parent="1.1">
          Post: Meanwhile: "The damage climate change will inflict on the world's economy is likely to have been massively underestimated, according to new research by my colleagues and I which accounts for the full global reach of extreme weather and its aftermath."
          Author: David Roberts (@volts.wtf)
          
          <media type="link">
            Title: "Climate Change Could Wipe 40% Off Global Economy, Study Predicts"
            URL: https://www.sciencealert.com/climate-change-could-wipe-40-off-global-economy-study-predicts
            Description: "The damage climate change will inflict on the world's economy is likely to have been massively underestimated..."
          </media>
          
          Posted: 4/3/2025, 6:38 PM | Engagement: 52 likes, 12 reposts, 2 replies, 1 quote
          
          <replies>
            <post id="1.3" type="reply,link,mention" parent="1.2">
              Post: By the way, these links came to me via @billmckibben.bsky.social's excellent newsletter, to which I assume you are all already subscribed.
              Author: David Roberts (@volts.wtf)
              
              <mentions>
                <user>@billmckibben.bsky.social</user>
              </mentions>
              
              <media type="link">
                Title: "Hands off...the future"
                URL: https://billmckibben.substack.com/p/hands-offthe-future
                Description: "So many ways to wreck an economy, and Trump is trying them all"
              </media>
              
              Posted: 4/3/2025, 6:42 PM | Engagement: 13 likes, 2 reposts, 0 replies, 0 quotes
            </post>
          </replies>
        </post>
      </replies>
    </post>
  </thread>
  
  <!-- Example of a repost -->
  <post id="2" type="repost,reply_limited">
    <repost_info>
      Reposted by: Dan Hon (@danhon.com)
      Reposted at: 4/3/2025, 6:21 PM
    </repost_info>
    
    <original_post>
      Post: People who told everyone that masking was the worst possible thing to be asked to do are now telling USians that "sacrifice" and it's so ridiculous.
      Author: Prisonculture (@prisonculture.bsky.social)
      Posted: 4/3/2025, 5:55 PM | Engagement: 523 likes, 108 reposts, 12 replies
      Thread settings: Replies limited to followers/following
    </original_post>
  </post>
  
  <!-- Example of a post with an image -->
  <post id="3" type="standalone,image">
    Post: have you tried not using a platform that charges you $30 / 100GB of bandwidth
    Author: futur (@futur.blue)
    
    <media type="image">
      Image: "AI crawlers are wrecking the open internet. My small side project - techpays .com - used to generate below 100GB of traffic per month. It's on Render where 500GB/month included, above it's $30 per 100GB. Meta's AI crawler + other bots have pushed it to 700GB+ per month. WTH"
      URL: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:uu5axsmbm2or2dngy4gwchec/bafkreid63xdhokzxbc7oafwf3vcad6tzsuwkalhm4swkhjkp4sqylnkcba@jpeg
    </media>
    
    Posted: 4/2/2025, 3:34 PM | Engagement: 6 likes, 0 reposts, 0 replies
  </post>
  
  <!-- Example of a quote post -->
  <post id="4" type="quote">
    Post: Congress would impeach, and Democrats would vote with Republicans to remove him from office... Or, you know, there'd be a coup
    Author: Nick Cunningham (@nickcunningham.bsky.social)
    
    <quoted_post id="4.quoted">
      Post: Can't help but feel that if President Bernie Sanders pulled this move the entirety of American business would try to get him pushed out of office immediately.
      Author: Chris Hayes (@chrislhayes.bsky.social)
      Posted: 4/2/2025, 8:41 PM | Engagement: 8213 likes, 1098 reposts, 300 replies
    </quoted_post>
    
    Posted: 4/2/2025, 9:23 PM | Engagement: 1 like, 0 reposts, 0 replies
  </post>
  
  <!-- Example of a post with a video -->
  <post id="5" type="video">
    Post: Dude my left foot is swollen af (this is normal)
    Author: Mr. Dr. Cameron Pfiffer (@cameron.pfiffer.org)
    
    <media type="video">
      Thumbnail: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/thumbnail.jpg
      Playlist: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/playlist.m3u8
      Aspect ratio: 1440x1080
    </media>
    
    Posted: 4/2/2025, 9:11 PM | Engagement: 2 likes, 0 reposts, 3 replies
  </post>
  
  <!-- Example of a post with external link -->
  <post id="6" type="link">
    Post: We have an official C# MCP SDK
    Author: Koji (@littleironwaltz.com)
    
    <media type="link">
      Title: "Microsoft partners with Anthropic to create official C# SDK for Model Context Protocol"
      URL: https://devblogs.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol
      Description: "Microsoft is collaborating with Anthropic to create an official C# SDK for the Model Context Protocol (MCP). MCP has seen rapid adoption in the AI community, and this partnership aims to enhance the i..."
      Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:pxfxhbwjtscbmvbe62shdqbe/bafkreig4gxjejqcb2dsuvqgk7edi24vjmwtricry5qn7wycenescq52inq@jpeg
    </media>
    
    Posted: 4/2/2025, 9:57 PM | Engagement: 0 likes, 0 reposts, 0 replies
  </post>
  
  <!-- Example of a complex post with multiple attributes -->
  <post id="7" type="reply,quote,image,video">
    Post: This is an example of a complex post with multiple media types and attributes
    Author: Complex Example (@complex)
    
    <reply_to id="3">
      Original Post: have you tried not using a platform that charges you $30 / 100GB of bandwidth
      Author: futur (@futur.blue)
    </reply_to>
    
    <quoted_post id="6">
      Post: We have an official C# MCP SDK
      Author: Koji (@littleironwaltz.com)
    </quoted_post>
    
    <media type="image">
      Image: "Description of the first image"
      URL: https://example.com/image1.jpg
    </media>
    
    <media type="image">
      Image: "Description of the second image"
      URL: https://example.com/image2.jpg
    </media>
    
    <media type="video">
      Thumbnail: https://example.com/video-thumb.jpg
      URL: https://example.com/video.mp4
    </media>
    
    Posted: 4/3/2025, 7:15 PM | Engagement: 8 likes, 1 repost, 2 replies
  </post>
</feed>
```

## Format Details

### Reference Map
The `<reference_map>` section provides a lookup table that maps the simple format IDs to original Bluesky URIs:
- `id` - The simple ID used in the format
- `uri` - The full Bluesky URI
- `short_id` - The last segment of the URI (optional, for easier reference)

### Post Information
Each post includes:
- `id` - Simple identifier used within the format
- `type` - Comma-separated list of post attributes/types
- Post content (text)
- Author information (name and handle)
- Posting timestamp (in human-readable format)
- Engagement metrics (likes, reposts, replies, quotes)

### Media Information
Media is contained in `<media>` tags with a type attribute:
- `type="image"` - For images
- `type="video"` - For videos
- `type="link"` - For external links

### Special Sections
- `<quoted_post>` - For embedded/quoted posts
- `<repost_info>` - Information about who reposted content
- `<original_post>` - Original content of a repost
- `<reply_to>` - Reference to the post being replied to
- `<mentions>` - List of users mentioned in the post

### Hierarchical Structure
- Threads use the `<thread>` tag to group related posts
- Replies are nested in `<replies>` tags under their parent post
- The `parent` attribute provides explicit relationship information

## Implementation Notes

1. The format separates structure (using XML) from content (using key-value pairs)
2. Complex posts with multiple attributes are supported through comma-separated types
3. The reference map provides a clean way to reference original URIs without cluttering the format
4. The hierarchical ID system makes relationships immediately clear
5. Content is structured to prioritize the most important information first
6. All elements maintain clear, consistent formatting for better LLM comprehension

This format provides a robust, flexible way to represent Bluesky posts that balances the needs of LLM comprehension with accurate representation of the original content and relationships.