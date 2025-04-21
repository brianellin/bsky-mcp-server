# Post Examples Processing Results

## File: post_embed_external.json

### Individual Post:
```xml
  <post type="standalone" uri="at://did:plc:pxfxhbwjtscbmvbe62shdqbe/app.bsky.feed.post/3llueyg4emc2k" bsky_url="https://bsky.app/profile/littleironwaltz.com/post/3llueyg4emc2k" author_name="Koji" author_handle="littleironwaltz.com" posted_at="2025-04-02 14:57:19">
    <content>
      We have an official C# MCP SDK
    </content>
    
    <embed type="link">
      Title: "Microsoft partners with Anthropic to create official C# SDK for Model Context Protocol"
      URL: https://devblogs.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol
      Description: "Microsoft is collaborating with Anthropic to create an official C# SDK for the Model Context Protocol (MCP). MCP has seen rapid adoption in the AI community, and this partnership aims to enhance the i..."
    </embed>
    
    Engagement: 0 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone" uri="at://did:plc:pxfxhbwjtscbmvbe62shdqbe/app.bsky.feed.post/3llueyg4emc2k" bsky_url="https://bsky.app/profile/littleironwaltz.com/post/3llueyg4emc2k" author_name="Koji" author_handle="littleironwaltz.com" posted_at="2025-04-02 14:57:19">
    <content>
      We have an official C# MCP SDK
    </content>
    
    <embed type="link">
      Title: "Microsoft partners with Anthropic to create official C# SDK for Model Context Protocol"
      URL: https://devblogs.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol
      Description: "Microsoft is collaborating with Anthropic to create an official C# SDK for the Model Context Protocol (MCP). MCP has seen rapid adoption in the AI community, and this partnership aims to enhance the i..."
    </embed>
    
    Engagement: 0 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_embed_image.json

### Individual Post:
```xml
  <post type="standalone" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lluh2z5vxs2m" bsky_url="https://bsky.app/profile/futur.blue/post/3lluh2z5vxs2m" author_name="futur" author_handle="futur.blue" posted_at="2025-04-02 15:34:34">
    <content>
      have you tried not using a platform that charges you $30 / 100GB of bandwidth
    </content>
    
    <embed type="image">
      Image description: "AI crawlers are wrecking the open internet.

My small side project - techpays .com - used to generate below 100GB of traffic per month. It’s on Render where 500GB/month included, above it’s $30 per 100GB.

Meta’s AI crawler + other bots have pushed it to 700GB+ per month

WTH"
      Image URL: https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:uu5axsmbm2or2dngy4gwchec/bafkreid63xdhokzxbc7oafwf3vcad6tzsuwkalhm4swkhjkp4sqylnkcba@jpeg
    </embed>
    
    Engagement: 6 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lluh2z5vxs2m" bsky_url="https://bsky.app/profile/futur.blue/post/3lluh2z5vxs2m" author_name="futur" author_handle="futur.blue" posted_at="2025-04-02 15:34:34">
    <content>
      have you tried not using a platform that charges you $30 / 100GB of bandwidth
    </content>
    
    <embed type="image">
      Image description: "AI crawlers are wrecking the open internet.

My small side project - techpays .com - used to generate below 100GB of traffic per month. It’s on Render where 500GB/month included, above it’s $30 per 100GB.

Meta’s AI crawler + other bots have pushed it to 700GB+ per month

WTH"
      Image URL: https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:uu5axsmbm2or2dngy4gwchec/bafkreid63xdhokzxbc7oafwf3vcad6tzsuwkalhm4swkhjkp4sqylnkcba@jpeg
    </embed>
    
    Engagement: 6 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_embed_post.json

### Individual Post:
```xml
  <post type="standalone,quote" uri="at://did:plc:7r5xfysukluplxs2hufswhe4/app.bsky.feed.post/3llud3c2th224" bsky_url="https://bsky.app/profile/nickcunningham.bsky.social/post/3llud3c2th224" author_name="Nick Cunningham" author_handle="nickcunningham.bsky.social" posted_at="2025-04-02 14:23:08">
    <content>
      Congress would impeach, and Democrats would vote with Republicans to remove him from office 

Or, you know, there'd be a coup
    </content>
    
    <quoted_post uri="at://did:plc:e62gb2ushvtvjvqcbrxeaw2n/app.bsky.feed.post/3lluaqbsgck2g" bsky_url="https://bsky.app/profile/chrislhayes.bsky.social/post/3lluaqbsgck2g" author_name="Chris Hayes" author_handle="chrislhayes.bsky.social" posted_at="2025-04-02 13:41:12">
      <content>
        Can’t help but feel that if President Bernie Sanders pulled this move the entirety of American business would try to get him pushed out of office immediately.
      </content>
      
      Engagement: 8213 likes, 1098 reposts, 300 replies
    </quoted_post>
    
    Engagement: 1 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone,quote" uri="at://did:plc:7r5xfysukluplxs2hufswhe4/app.bsky.feed.post/3llud3c2th224" bsky_url="https://bsky.app/profile/nickcunningham.bsky.social/post/3llud3c2th224" author_name="Nick Cunningham" author_handle="nickcunningham.bsky.social" posted_at="2025-04-02 14:23:08">
    <content>
      Congress would impeach, and Democrats would vote with Republicans to remove him from office 

Or, you know, there'd be a coup
    </content>
    
    <quoted_post uri="at://did:plc:e62gb2ushvtvjvqcbrxeaw2n/app.bsky.feed.post/3lluaqbsgck2g" bsky_url="https://bsky.app/profile/chrislhayes.bsky.social/post/3lluaqbsgck2g" author_name="Chris Hayes" author_handle="chrislhayes.bsky.social" posted_at="2025-04-02 13:41:12">
      <content>
        Can’t help but feel that if President Bernie Sanders pulled this move the entirety of American business would try to get him pushed out of office immediately.
      </content>
      
      Engagement: 8213 likes, 1098 reposts, 300 replies
    </quoted_post>
    
    Engagement: 1 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_embed_video.json

### Individual Post:
```xml
  <post type="standalone" uri="at://did:plc:gfrmhdmjvxn2sjedzboeudef/app.bsky.feed.post/3llucfyjpts2u" bsky_url="https://bsky.app/profile/cameron.pfiffer.org/post/3llucfyjpts2u" author_name="Mr. Dr. Cameron Pfiffer" author_handle="cameron.pfiffer.org" posted_at="2025-04-02 14:11:14">
    <content>
      Dude my left foot is swollen af (this is normal)
    </content>
    
    <embed type="video">
      Thumbnail: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/thumbnail.jpg
      Playlist: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/playlist.m3u8
    </embed>
    
    Engagement: 2 likes, 0 reposts, 3 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone" uri="at://did:plc:gfrmhdmjvxn2sjedzboeudef/app.bsky.feed.post/3llucfyjpts2u" bsky_url="https://bsky.app/profile/cameron.pfiffer.org/post/3llucfyjpts2u" author_name="Mr. Dr. Cameron Pfiffer" author_handle="cameron.pfiffer.org" posted_at="2025-04-02 14:11:14">
    <content>
      Dude my left foot is swollen af (this is normal)
    </content>
    
    <embed type="video">
      Thumbnail: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/thumbnail.jpg
      Playlist: https://video.bsky.app/watch/did%3Aplc%3Agfrmhdmjvxn2sjedzboeudef/bafkreibfzgezk2jhlef5i3du5yw3p6qn6wxynakf53seqahf743i6yzbpa/playlist.m3u8
    </embed>
    
    Engagement: 2 likes, 0 reposts, 3 replies
  </post>
</posts>
```



## File: post_plain.json

### Individual Post:
```xml
  <post type="standalone" uri="at://did:plc:ad4m72ykh2evfdqen3qowxmg/app.bsky.feed.post/3lmagyhnygs2b" bsky_url="https://bsky.app/profile/tessa.germnetwork.com/post/3lmagyhnygs2b" author_name="tessalaprofessa" author_handle="tessa.germnetwork.com" posted_at="2025-04-07 10:05:05">
    <content>
      you know it's bad when you're checking the 10 year range
    </content>
    
    Engagement: 1 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone" uri="at://did:plc:ad4m72ykh2evfdqen3qowxmg/app.bsky.feed.post/3lmagyhnygs2b" bsky_url="https://bsky.app/profile/tessa.germnetwork.com/post/3lmagyhnygs2b" author_name="tessalaprofessa" author_handle="tessa.germnetwork.com" posted_at="2025-04-07 10:05:05">
    <content>
      you know it's bad when you're checking the 10 year range
    </content>
    
    Engagement: 1 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_repost_plain.json

### Individual Post:
```xml
  <repost author_name="Dan Hon" author_handle="danhon.com" reposted_at="2025-04-03 11:21:24">
    <post type="standalone" uri="at://did:plc:6tr6tuzlx2db3rduzr2d6r24/app.bsky.feed.post/3llwhxehrac2o" bsky_url="https://bsky.app/profile/prisonculture.bsky.social/post/3llwhxehrac2o" author_name="Prisonculture" author_handle="prisonculture.bsky.social" posted_at="2025-04-03 10:55:45">
      <content>
        People who told everyone that masking was the worst possible thing to be asked to do are now telling USians that "sacrifice" and it's so ridiculous.
      </content>
      
      Engagement: 523 likes, 108 reposts, 12 replies
    </post>
  </repost>
```

### Using preprocessPosts:
```xml
<posts>
  <repost author_name="Dan Hon" author_handle="danhon.com" reposted_at="2025-04-03 11:21:24">
    <post type="standalone" uri="at://did:plc:6tr6tuzlx2db3rduzr2d6r24/app.bsky.feed.post/3llwhxehrac2o" bsky_url="https://bsky.app/profile/prisonculture.bsky.social/post/3llwhxehrac2o" author_name="Prisonculture" author_handle="prisonculture.bsky.social" posted_at="2025-04-03 10:55:45">
      <content>
        People who told everyone that masking was the worst possible thing to be asked to do are now telling USians that "sacrifice" and it's so ridiculous.
      </content>
      
      Engagement: 523 likes, 108 reposts, 12 replies
    </post>
  </repost>
</posts>
```



## File: post_self_response_thread.json

### Individual Post:
```xml
  <post type="reply" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkkfiias2o" bsky_url="https://bsky.app/profile/volts.wtf/post/3llwkkfiias2o" author_name="David Roberts" author_handle="volts.wtf" posted_at="2025-04-03 11:42:11" reply_to="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkeghjyk2o">
    <content>
      By the way, these links came to me via [@billmckibben.bsky.social](https://bsky.app/profile/did:plc:t6ylzujdaa3f6mlpxn6gjqf5)'s excellent newsletter, to which I assume you are all already subscribed.
    </content>
    
    <embed type="link">
      Title: "Hands off...the future"
      URL: https://billmckibben.substack.com/p/hands-offthe-future?publication_id=438146&post_id=159935925&isFreemail=true&r=bzxnl&triedRedirect=true
      Description: "So many ways to wreck an economy, and Trump is trying them all"
    </embed>
    
    Engagement: 13 likes, 2 reposts, 0 replies
  </post>
```

### Full Feed:
```xml
<posts>
</posts>
```

### Using preprocessPosts:
```xml
<posts>
</posts>
```



