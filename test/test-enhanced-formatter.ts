import { formatPost } from '../src/utils.js';
import * as fs from 'fs';
import * as path from 'path';

// Define interfaces for the feed data structure
interface PostAuthor {
  did: string;
  handle: string;
  displayName?: string;
  [key: string]: any;
}

interface PostRecord {
  text?: string;
  facets?: Array<{
    features?: Array<{
      $type: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  }>;
  reply?: any;
  [key: string]: any;
}

interface Post {
  uri: string;
  author: PostAuthor;
  record?: PostRecord;
  embed?: {
    $type: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface FeedItem {
  post: Post;
  reply?: any;
  [key: string]: any;
}

interface FeedData {
  feed: FeedItem[];
  [key: string]: any;
}

// Debug function to help analyze post structure
function analyzePostStructure(post: any, depth: number = 0): void {
  if (!post) return;
  
  const prefix = '  '.repeat(depth);
  
  if (typeof post !== 'object') {
    console.log(`${prefix}${post} (${typeof post})`);
    return;
  }
  
  if (Array.isArray(post)) {
    console.log(`${prefix}Array[${post.length}]`);
    if (post.length > 0 && depth < 3) {
      analyzePostStructure(post[0], depth + 1);
    }
    return;
  }
  
  console.log(`${prefix}Object {`);
  const keys = Object.keys(post);
  keys.forEach(key => {
    const value = post[key];
    if (key === '$type') {
      console.log(`${prefix}  ${key}: ${value}`);
    } else if (typeof value === 'object' && value !== null) {
      console.log(`${prefix}  ${key}: `);
      if (depth < 3) {
        analyzePostStructure(value, depth + 1);
      } else {
        console.log(`${prefix}    [Object]`);
      }
    } else {
      console.log(`${prefix}  ${key}: ${value}`);
    }
  });
  console.log(`${prefix}}`);
}

// Function to run the test
async function testWithRealData() {
  console.log('Testing enhanced formatPost with real Bluesky feed data\n');
  
  try {
    // Load the sample feed data
    // Use __dirname to get the current directory and look for feed_example.json in the test directory
    const dataPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'feed_example.json');
    const feedData: FeedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (!feedData || !feedData.feed || !Array.isArray(feedData.feed)) {
      console.error('Invalid feed data structure');
      return;
    }
    
    console.log(`Loaded ${feedData.feed.length} posts from feed_example.json\n`);
    
    // Analyze all posts to understand their structure
    feedData.feed.slice(0, 3).forEach((item: FeedItem, idx: number) => {
      console.log(`\n==== Analyzing Post #${idx + 1} Structure ====`);
      analyzePostStructure(item.post, 0);
      console.log('\n');
    });
    
    // Test with different post types
    
    // 1. Find a simple text post
    console.log('===== Test 1: Simple text post =====');
    const basicPost = feedData.feed.find((item: FeedItem) => {
      const post = item.post;
      const hasText = post.record && post.record.text && post.record.text.length > 0;
      const hasNoEmbed = !post.embed;
      const hasNoReply = post.record && !post.record.reply && !item.reply;
      return hasText && hasNoEmbed && hasNoReply;
    });
    
    if (basicPost) {
      console.log(formatPost(basicPost, 0));
    } else {
      console.log('No simple text post found in the sample data');
    }
    console.log('\n');
    
    // 2. Find a post with quote embed
    console.log('===== Test 2: Post with quote embed =====');
    const quotePost = feedData.feed.find((item: FeedItem) => {
      const post = item.post;
      return post.embed && post.embed.$type === 'app.bsky.embed.record';
    });
    
    if (quotePost) {
      console.log(formatPost(quotePost, 1));
    } else {
      console.log('No post with quote embed found in the sample data');
    }
    console.log('\n');
    
    // 3. Find a post with external URL
    console.log('===== Test 3: Post with external URL embed =====');
    const linkPost = feedData.feed.find((item: FeedItem) => {
      const post = item.post;
      return post.embed && post.embed.$type === 'app.bsky.embed.external';
    });
    
    if (linkPost) {
      console.log(formatPost(linkPost, 2));
    } else {
      // Look for posts with links in facets
      const facetLinkPost = feedData.feed.find((item: FeedItem) => {
        const record = item.post.record;
        return record && 
              record.facets && 
              record.facets.some((f: any) => 
                f.features && 
                f.features.some((feature: any) => feature.$type === 'app.bsky.richtext.facet#link')
              );
      });
      
      if (facetLinkPost) {
        console.log(formatPost(facetLinkPost, 2));
      } else {
        console.log('No post with external URL found in the sample data');
      }
    }
    console.log('\n');
    
    // 4. Find a reply post
    console.log('===== Test 4: Reply post =====');
    const replyPost = feedData.feed.find((item: FeedItem) => {
      return (item.reply !== undefined || 
              (item.post.record && item.post.record.reply !== undefined));
    });
    
    if (replyPost) {
      console.log(formatPost(replyPost, 3));
    } else {
      console.log('No reply post found in the sample data');
    }
    console.log('\n');
    
    // 5. Find a post with nested quote (record within record)
    console.log('===== Test 5: Post with nested quote =====');
    const nestedQuotePost = feedData.feed.find((item: FeedItem) => {
      const post = item.post;
      return post.embed && 
             post.embed.$type === 'app.bsky.embed.record' && 
             post.embed.record && 
             post.embed.record.embeds && 
             post.embed.record.embeds.length > 0;
    });
    
    if (nestedQuotePost) {
      console.log(formatPost(nestedQuotePost, 4));
    } else {
      console.log('No post with nested quote found in the sample data');
    }
    console.log('\n');
    
    // 6. Find a post with hashtags
    console.log('===== Test 6: Post with hashtags =====');
    const hashtagPost = feedData.feed.find((item: FeedItem) => {
      const record = item.post.record;
      return record && 
             record.facets && 
             record.facets.some((f: any) => 
               f.features && 
               f.features.some((ft: any) => ft.$type === 'app.bsky.richtext.facet#tag')
             );
    });
    
    if (hashtagPost) {
      console.log(formatPost(hashtagPost, 5));
    } else {
      console.log('No post with hashtags found in the sample data');
    }
    console.log('\n');
    
    // 7. Find a post with recordWithMedia
    console.log('===== Test 7: Post with record and media =====');
    const recordWithMediaPost = feedData.feed.find((item: FeedItem) => {
      const post = item.post;
      return post.embed && post.embed.$type === 'app.bsky.embed.recordWithMedia';
    });
    
    if (recordWithMediaPost) {
      console.log(formatPost(recordWithMediaPost, 6));
    } else {
      console.log('No post with record and media found in the sample data');
    }
    
  } catch (error) {
    console.error('Error testing formatter:', error);
  }
}

// Run the test
testWithRealData().catch(console.error); 