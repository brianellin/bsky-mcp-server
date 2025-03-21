import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { formatPost } from '../src/utils.js';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, 'feed_example.json');

console.log("Testing formatPost utility function with real feed data");

// Load real feed data
try {
  const feedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  if (!Array.isArray(feedData) || feedData.length === 0) {
    console.error("Error: Feed data is empty or not an array");
    process.exit(1);
  }
  
  console.log(`\nLoaded ${feedData.length} posts from feed_example.json\n`);
  
  // Test the formatPost function on various types of posts from real data
  
  // Test 1: Basic post (simple text post)
  console.log("===== Test 1: Basic post =====");
  const basicPost = feedData.find(post => 
    !post.embed && !post.record?.reply && !post.reply && 
    (!post.facets || post.facets.length === 0) &&
    post.record?.text?.length < 100 // Keep it simple
  );
  
  if (basicPost) {
    console.log(formatPost(basicPost, 0));
  } else {
    console.log("No simple basic post found in the sample data");
  }
  
  // Test 2: Post with images
  console.log("\n\n===== Test 2: Post with images =====");
  const imagePost = feedData.find(post => 
    post.embed?.$type === 'app.bsky.embed.images'
  );
  
  if (imagePost) {
    console.log(formatPost(imagePost, 1));
  } else {
    console.log("No post with images found in the sample data");
  }
  
  // Test 3: Post with external link
  console.log("\n\n===== Test 3: Post with external link =====");
  const linkPost = feedData.find(post => 
    post.embed?.$type === 'app.bsky.embed.external' ||
    post.facets?.some((facet: any) => 
      facet.features?.some((feature: any) => feature.$type === 'app.bsky.richtext.facet#link')
    )
  );
  
  if (linkPost) {
    console.log(formatPost(linkPost, 2));
  } else {
    console.log("No post with external link found in the sample data");
  }
  
  // Test 4: Quote post
  console.log("\n\n===== Test 4: Quote post =====");
  const quotePost = feedData.find(post => 
    post.embed?.$type === 'app.bsky.embed.record' || 
    post.embed?.$type === 'app.bsky.embed.record#view'
  );
  
  if (quotePost) {
    console.log(formatPost(quotePost, 3));
  } else {
    console.log("No quote post found in the sample data");
  }
  
  // Test 5: Post with nested quote
  console.log("\n\n===== Test 5: Post with nested quote =====");
  const nestedQuotePost = feedData.find(post => 
    (post.embed?.$type === 'app.bsky.embed.record' || post.embed?.$type === 'app.bsky.embed.record#view') &&
    post.embed?.record?.value?.embed
  );
  
  if (nestedQuotePost) {
    console.log(formatPost(nestedQuotePost, 4));
  } else {
    console.log("No post with nested quote found in the sample data");
  }
  
  // Test 6: Post with hashtags
  console.log("\n\n===== Test 6: Post with hashtags =====");
  const hashtagPost = feedData.find(post => 
    post.record?.text?.includes('#') || 
    post.facets?.some((facet: any) => 
      facet.features?.some((feature: any) => feature.$type === 'app.bsky.richtext.facet#tag')
    )
  );
  
  if (hashtagPost) {
    console.log(formatPost(hashtagPost, 5));
  } else {
    console.log("No post with hashtags found in the sample data");
  }
  
  // Test 7: Post with record and media
  console.log("\n\n===== Test 7: Post with record and media =====");
  const recordWithMediaPost = feedData.find(post => 
    post.embed?.$type === 'app.bsky.embed.recordWithMedia'
  );
  
  if (recordWithMediaPost) {
    console.log(formatPost(recordWithMediaPost, 6));
  } else {
    console.log("No post with record and media found in the sample data");
  }
  
} catch (error) {
  console.error(`Error loading or processing feed data: ${error}`);
  process.exit(1);
} 