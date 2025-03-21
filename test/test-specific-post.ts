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
    record?: any;
    external?: any;
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

// Function to test a specific post
async function testSpecificPost(): Promise<void> {
  console.log('Testing enhanced formatPost with a specific complex post\n');
  
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
    
    // Find the post with a quote embed (specifically the one talking about outbound links)
    const quotePost = feedData.feed.find((item: FeedItem) => 
      item.post.record?.text?.includes("Make outbound links great again")
    );
    
    if (quotePost) {
      console.log('===== Found complex quote post =====');
      console.log('Original post JSON structure:');
      console.log(JSON.stringify(quotePost.post, null, 2).substring(0, 500) + '...');
      console.log('\n===== Formatted output =====');
      console.log(formatPost(quotePost, 0));
    } else {
      console.log('Could not find the specific quote post');
    }
    
    // Try to find another post that has rich features
    const anotherInterestingPost = feedData.feed.find((item: FeedItem, index: number) => 
      (quotePost ? index !== feedData.feed.indexOf(quotePost) : true) && // Not the same as the first one
      item.post.embed && // Has an embed
      item.post.embed.$type?.includes('record') // Is a quote or has a record
    );
    
    if (anotherInterestingPost) {
      console.log('\n\n===== Another interesting post =====');
      console.log('Original post JSON structure:');
      console.log(JSON.stringify(anotherInterestingPost.post, null, 2).substring(0, 500) + '...');
      console.log('\n===== Formatted output =====');
      console.log(formatPost(anotherInterestingPost, 1));
    }
    
  } catch (error) {
    console.error('Error testing formatter with specific post:', error);
  }
}

// Run the test
testSpecificPost().catch(console.error); 