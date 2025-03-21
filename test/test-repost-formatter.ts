import { formatPost } from '../src/utils.js';
import * as fs from 'fs';
import * as path from 'path';

// Load the sample feed data
const feedExample = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'test', 'feed_example.json'), 'utf-8'));

// Find a repost in the feed
const repost = feedExample.feed.find((item: any) => 
  item.reason && item.reason.$type === 'app.bsky.feed.defs#reasonRepost'
);

if (repost) {
  console.log('Found a repost in the feed example:');
  console.log('---');
  
  // Format the repost using our updated formatter
  const formattedRepost = formatPost(repost, 0);
  console.log(formattedRepost);
  
  console.log('---');
  console.log('Original repost data structure:');
  console.log(JSON.stringify({
    postUri: repost.post.uri,
    originalAuthor: repost.post.author.handle,
    reposter: repost.reason.by.handle,
    repostedAt: repost.reason.indexedAt
  }, null, 2));
} else {
  console.log('No reposts found in the feed example.');
} 