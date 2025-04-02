import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { formatPost } from '../utils.js';

// Read the feed example JSON
const feedExamplePath = join(process.cwd(), 'test', 'example_feeds','feed_example.json');
const feedExample = JSON.parse(readFileSync(feedExamplePath, 'utf-8'));

// Process each post and format it
const formattedPosts = feedExample.feed.map((item: any, index: number) => {
  return formatPost(item, index);
});

// Join all posts with newlines
const markdownContent = formattedPosts.join('\n\n');

// Write the output to a markdown file
const outputPath = join(process.cwd(), 'test', 'feed_example.md');
writeFileSync(outputPath, markdownContent);

console.log('Feed example has been processed and written to feed_example.md'); 