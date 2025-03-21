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

// Function to run the comprehensive test
async function runComprehensiveTest() {
  console.log('Comprehensive test of the enhanced formatPost function\n');
  
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
    
    // Test all posts in the feed
    console.log('===== Formatting the first 5 posts from the feed =====\n');
    
    feedData.feed.slice(0, 5).forEach((item: FeedItem, index: number) => {
      console.log(`\n----- Post #${index + 1} -----`);
      const formattedPost = formatPost(item, index);
      console.log(formattedPost);
    });
    
    // Let's find a post with interesting features from later in the feed
    console.log('\n===== Finding a post with unique features =====\n');
    
    // Look for a post with hashtags and complex structure
    const uniquePost = feedData.feed.find((item: FeedItem, index: number) => 
      index >= 5 && // Skip the first 5 we already formatted
      item.post.record?.facets && // Has facets
      Array.isArray(item.post.record.facets) &&
      item.post.record.facets.some((f: any) => 
        f.features && 
        Array.isArray(f.features) && 
        f.features.some((feat: any) => feat.$type === 'app.bsky.richtext.facet#tag')
      )
    );
    
    if (uniquePost) {
      console.log('Found a post with hashtags:');
      console.log(formatPost(uniquePost, 5));
    }
    
  } catch (error) {
    console.error('Error in comprehensive test:', error);
  }
}

// Run the test
runComprehensiveTest().catch(console.error); 