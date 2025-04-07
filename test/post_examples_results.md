# Post Examples Processing Results

## File: post_embed_external.json

### Individual Post:
```xml
  <post type="standalone" uri="at://did:plc:pxfxhbwjtscbmvbe62shdqbe/app.bsky.feed.post/3llueyg4emc2k" bsky_url="https://bsky.app/profile/littleironwaltz.com/post/3llueyg4emc2k" author_name="Koji" author_handle="littleironwaltz.com">
    <content>
      We have an official C# MCP SDK
    </content>
    
    <embed type="link">
      Title: "Microsoft partners with Anthropic to create official C# SDK for Model Context Protocol"
      URL: https://devblogs.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol
      Description: "Microsoft is collaborating with Anthropic to create an official C# SDK for the Model Context Protocol (MCP). MCP has seen rapid adoption in the AI community, and this partnership aims to enhance the i..."
      Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:pxfxhbwjtscbmvbe62shdqbe/bafkreig4gxjejqcb2dsuvqgk7edi24vjmwtricry5qn7wycenescq52inq@jpeg
    </embed>
    
    Posted: 2025-04-02 14:57:19 | Engagement: 0 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone" uri="at://did:plc:pxfxhbwjtscbmvbe62shdqbe/app.bsky.feed.post/3llueyg4emc2k" bsky_url="https://bsky.app/profile/littleironwaltz.com/post/3llueyg4emc2k" author_name="Koji" author_handle="littleironwaltz.com">
    <content>
      We have an official C# MCP SDK
    </content>
    
    <embed type="link">
      Title: "Microsoft partners with Anthropic to create official C# SDK for Model Context Protocol"
      URL: https://devblogs.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol
      Description: "Microsoft is collaborating with Anthropic to create an official C# SDK for the Model Context Protocol (MCP). MCP has seen rapid adoption in the AI community, and this partnership aims to enhance the i..."
      Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:pxfxhbwjtscbmvbe62shdqbe/bafkreig4gxjejqcb2dsuvqgk7edi24vjmwtricry5qn7wycenescq52inq@jpeg
    </embed>
    
    Posted: 2025-04-02 14:57:19 | Engagement: 0 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_embed_image.json

### Individual Post:
```xml
  <post type="standalone" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lluh2z5vxs2m" bsky_url="https://bsky.app/profile/futur.blue/post/3lluh2z5vxs2m" author_name="futur" author_handle="futur.blue">
    <content>
      have you tried not using a platform that charges you $30 / 100GB of bandwidth
    </content>
    
    <embed type="image">
      Image description: "AI crawlers are wrecking the open internet.

My small side project - techpays .com - used to generate below 100GB of traffic per month. It’s on Render where 500GB/month included, above it’s $30 per 100GB.

Meta’s AI crawler + other bots have pushed it to 700GB+ per month

WTH"
      URL: https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:uu5axsmbm2or2dngy4gwchec/bafkreid63xdhokzxbc7oafwf3vcad6tzsuwkalhm4swkhjkp4sqylnkcba@jpeg
    </embed>
    
    Posted: 2025-04-02 15:34:34 | Engagement: 6 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone" uri="at://did:plc:uu5axsmbm2or2dngy4gwchec/app.bsky.feed.post/3lluh2z5vxs2m" bsky_url="https://bsky.app/profile/futur.blue/post/3lluh2z5vxs2m" author_name="futur" author_handle="futur.blue">
    <content>
      have you tried not using a platform that charges you $30 / 100GB of bandwidth
    </content>
    
    <embed type="image">
      Image description: "AI crawlers are wrecking the open internet.

My small side project - techpays .com - used to generate below 100GB of traffic per month. It’s on Render where 500GB/month included, above it’s $30 per 100GB.

Meta’s AI crawler + other bots have pushed it to 700GB+ per month

WTH"
      URL: https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:uu5axsmbm2or2dngy4gwchec/bafkreid63xdhokzxbc7oafwf3vcad6tzsuwkalhm4swkhjkp4sqylnkcba@jpeg
    </embed>
    
    Posted: 2025-04-02 15:34:34 | Engagement: 6 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_embed_post.json

### Individual Post:
```xml
  <post type="standalone,quote" uri="at://did:plc:7r5xfysukluplxs2hufswhe4/app.bsky.feed.post/3llud3c2th224" bsky_url="https://bsky.app/profile/nickcunningham.bsky.social/post/3llud3c2th224" author_name="Nick Cunningham" author_handle="nickcunningham.bsky.social">
    <content>
      Congress would impeach, and Democrats would vote with Republicans to remove him from office 

Or, you know, there'd be a coup
    </content>
    
    <quoted_post uri="at://did:plc:e62gb2ushvtvjvqcbrxeaw2n/app.bsky.feed.post/3lluaqbsgck2g" bsky_url="https://bsky.app/profile/chrislhayes.bsky.social/post/3lluaqbsgck2g" author_name="Chris Hayes" author_handle="chrislhayes.bsky.social">
      <content>
        Can’t help but feel that if President Bernie Sanders pulled this move the entirety of American business would try to get him pushed out of office immediately.
      </content>
      
      Posted: 2025-04-02 13:41:12 | Engagement: 8213 likes, 1098 reposts, 300 replies
    </quoted_post>
    
    Posted: 2025-04-02 14:23:08 | Engagement: 1 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone,quote" uri="at://did:plc:7r5xfysukluplxs2hufswhe4/app.bsky.feed.post/3llud3c2th224" bsky_url="https://bsky.app/profile/nickcunningham.bsky.social/post/3llud3c2th224" author_name="Nick Cunningham" author_handle="nickcunningham.bsky.social">
    <content>
      Congress would impeach, and Democrats would vote with Republicans to remove him from office 

Or, you know, there'd be a coup
    </content>
    
    <quoted_post uri="at://did:plc:e62gb2ushvtvjvqcbrxeaw2n/app.bsky.feed.post/3lluaqbsgck2g" bsky_url="https://bsky.app/profile/chrislhayes.bsky.social/post/3lluaqbsgck2g" author_name="Chris Hayes" author_handle="chrislhayes.bsky.social">
      <content>
        Can’t help but feel that if President Bernie Sanders pulled this move the entirety of American business would try to get him pushed out of office immediately.
      </content>
      
      Posted: 2025-04-02 13:41:12 | Engagement: 8213 likes, 1098 reposts, 300 replies
    </quoted_post>
    
    Posted: 2025-04-02 14:23:08 | Engagement: 1 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_embed_video.json

Error processing file:
```
TypeError: Cannot read properties of undefined (reading 'record')
```



## File: post_plain.json

### Individual Post:
```xml
  <post type="standalone" uri="at://did:plc:ad4m72ykh2evfdqen3qowxmg/app.bsky.feed.post/3lmagyhnygs2b" bsky_url="https://bsky.app/profile/tessa.germnetwork.com/post/3lmagyhnygs2b" author_name="tessalaprofessa" author_handle="tessa.germnetwork.com">
    <content>
      you know it's bad when you're checking the 10 year range
    </content>
    
    Posted: 2025-04-07 10:05:05 | Engagement: 1 likes, 0 reposts, 0 replies
  </post>
```

### Using preprocessPosts:
```xml
<posts>
  <post type="standalone" uri="at://did:plc:ad4m72ykh2evfdqen3qowxmg/app.bsky.feed.post/3lmagyhnygs2b" bsky_url="https://bsky.app/profile/tessa.germnetwork.com/post/3lmagyhnygs2b" author_name="tessalaprofessa" author_handle="tessa.germnetwork.com">
    <content>
      you know it's bad when you're checking the 10 year range
    </content>
    
    Posted: 2025-04-07 10:05:05 | Engagement: 1 likes, 0 reposts, 0 replies
  </post>
</posts>
```



## File: post_repost_plain.json

### Individual Post:
```xml
  <repost author_name="Dan Hon" author_handle="danhon.com" reposted_at="2025-04-03 11:21:24">
    <post type="standalone,reply_limited" uri="at://did:plc:6tr6tuzlx2db3rduzr2d6r24/app.bsky.feed.post/3llwhxehrac2o" bsky_url="https://bsky.app/profile/prisonculture.bsky.social/post/3llwhxehrac2o" author_name="Prisonculture" author_handle="prisonculture.bsky.social">
      <content>
        People who told everyone that masking was the worst possible thing to be asked to do are now telling USians that "sacrifice" and it's so ridiculous.
      </content>
      
      Posted: 2025-04-03 10:55:45 | Engagement: 523 likes, 108 reposts, 12 replies
      Thread settings: Replies limited to followers/following
    </post>
  </repost>
```

### Using preprocessPosts:
```xml
<posts>
  <repost author_name="Dan Hon" author_handle="danhon.com" reposted_at="2025-04-03 11:21:24">
    <post type="standalone,reply_limited" uri="at://did:plc:6tr6tuzlx2db3rduzr2d6r24/app.bsky.feed.post/3llwhxehrac2o" bsky_url="https://bsky.app/profile/prisonculture.bsky.social/post/3llwhxehrac2o" author_name="Prisonculture" author_handle="prisonculture.bsky.social">
      <content>
        People who told everyone that masking was the worst possible thing to be asked to do are now telling USians that "sacrifice" and it's so ridiculous.
      </content>
      
      Posted: 2025-04-03 10:55:45 | Engagement: 523 likes, 108 reposts, 12 replies
      Thread settings: Replies limited to followers/following
    </post>
  </repost>
</posts>
```



## File: post_self_response_thread.json

### Individual Post:
```xml
  <post type="reply" uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkkfiias2o" bsky_url="https://bsky.app/profile/volts.wtf/post/3llwkkfiias2o" author_name="David Roberts" author_handle="volts.wtf">
    <content>
      By the way, these links came to me via @billmckibben.bsky.social's excellent newsletter, to which I assume you are all already subscribed.
    </content>
    
    <reply_to uri="at://did:plc:twjze4qqf6fgxz33ct52wlnl/app.bsky.feed.post/3llwkeghjyk2o" bsky_url="https://bsky.app/profile/volts.wtf/post/3llwkeghjyk2o" author_name="David Roberts" author_handle="volts.wtf">
      <content>
        Meanwhile: "The damage climate change will inflict on the world's economy is likely to have been massively underestimated, according to new research by my colleagues and I which accounts for the full global reach of extreme weather and its aftermath."
      </content>
    </reply_to>
    
    <embed type="link">
      Title: "Hands off...the future"
      URL: https://billmckibben.substack.com/p/hands-offthe-future?publication_id=438146&post_id=159935925&isFreemail=true&r=bzxnl&triedRedirect=true
      Description: "So many ways to wreck an economy, and Trump is trying them all"
      Thumbnail: https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:twjze4qqf6fgxz33ct52wlnl/bafkreifubqddrwlp2pvtr3x4xnmwflyfvw7u7tkyxntv7hzka33iojwyhi@jpeg
    </embed>
    
    Posted: 2025-04-03 11:42:11 | Engagement: 13 likes, 2 reposts, 0 replies
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



